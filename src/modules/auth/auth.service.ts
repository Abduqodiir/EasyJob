import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { addDays, addMinutes } from 'date-fns';

import { User } from '../users';
import { Token } from './entities/token.entity';
import { RegisterDto, LoginDto, RefreshTokenDto, ResetPasswordDto } from './dtos'
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail'
import { UserRole } from 'src/modules/enums';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
    ) { }

    async register(registerDto: RegisterDto): Promise<{ message: string }> {
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new ConflictException('Bunday email bilan foydalanuvchi allaqachon ro\'yxatdan o\'tgan');
        }

        // Hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(registerDto.password, salt);

        // Create new user
        const newUser = this.userRepository.create({
            ...registerDto,
            password: hashedPassword,
        });

        const user = await this.userRepository.save(newUser);

        // Generate verification token
        const verificationToken = uuidv4();
        await this.tokenRepository.save({
            token: verificationToken,
            expiresAt: addDays(new Date(), 1),
            userId: user.id,
        });

        // Send verification email
        await this.mailService.sendVerificationEmail(
            user.email,
            user.firstName,
            `${this.configService.get('FRONTEND_URL')}/verify-email?token=${verificationToken}`,
        );

        return { message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi. Email orqali tasdiqlang' };
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string; user: Partial<User> }> {
        // Find user by email
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
        if (!user) {
            throw new UnauthorizedException('Email yoki parol noto\'g\'ri');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email yoki parol noto\'g\'ri');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new UnauthorizedException('Hisobingiz bloklangan. Admin bilan bog\'laning');
        }

        // Update last login timestamp
        user.lastLoginAt = new Date();
        await this.userRepository.save(user);

        // Generate tokens
        const tokens = await this.generateTokens(user);

        // Return user data without sensitive information
        const { password, ...userWithoutPassword } = user;

        return {
            ...tokens,
            user: userWithoutPassword,
        };
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            // Verify refresh token
            const payload = this.jwtService.verify(refreshTokenDto.refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });

            // Find token in database
            const tokenRecord = await this.tokenRepository.findOne({
                where: { token: refreshTokenDto.refreshToken, isRevoked: false },
                relations: ['user'],
            });

            if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
                throw new UnauthorizedException('Refresh token yaroqsiz yoki muddati tugagan');
            }

            // Revoke current refresh token
            tokenRecord.isRevoked = true;
            await this.tokenRepository.save(tokenRecord);

            // Generate new tokens
            const user = tokenRecord.user;
            return await this.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException('Refresh token yaroqsiz');
        }
    }

    async verifyEmail(token: string): Promise<{ message: string }> {
        const tokenRecord = await this.tokenRepository.findOne({
            where: { token, isRevoked: false },
            relations: ['user'],
        });

        if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
            throw new BadRequestException('Tasdiq kodi yaroqsiz yoki muddati tugagan');
        }

        const user = tokenRecord.user;
        user.isVerified = true;
        await this.userRepository.save(user);

        // Revoke token
        tokenRecord.isRevoked = true;
        await this.tokenRepository.save(tokenRecord);

        return { message: 'Email muvaffaqiyatli tasdiqlandi' };
    }

    async forgotPassword(email: string): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            // Return success message even if user doesn't exist for security
            return { message: 'Parolni tiklash uchun ko\'rsatmalar email orqali yuborildi' };
        }

        // Generate reset token
        const resetToken = uuidv4();
        await this.tokenRepository.save({
            token: resetToken,
            expiresAt: addMinutes(new Date(), 30), // Token expires in 30 minutes
            userId: user.id,
        });

        // Send password reset email
        await this.mailService.sendPasswordResetEmail(
            user.email,
            user.firstName,
            `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`,
        );

        return { message: 'Parolni tiklash uchun ko\'rsatmalar email orqali yuborildi' };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        const tokenRecord = await this.tokenRepository.findOne({
            where: { token: resetPasswordDto.token, isRevoked: false },
            relations: ['user'],
        });

        if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
            throw new BadRequestException('Parolni tiklash kodi yaroqsiz yoki muddati tugagan');
        }

        // Hash new password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, salt);

        // Update user password
        const user = tokenRecord.user;
        user.password = hashedPassword;
        await this.userRepository.save(user);

        // Revoke token
        tokenRecord.isRevoked = true;
        await this.tokenRepository.save(tokenRecord);

        // Revoke all refresh tokens for the user
        await this.tokenRepository.update(
            { userId: user.id, isRevoked: false },
            { isRevoked: true }
        );

        return { message: 'Parol muvaffaqiyatli o\'zgartirildi' };
    }

    async logout(userId: string): Promise<{ message: string }> {
        // Revoke all refresh tokens for the user
        await this.tokenRepository.update(
            { userId, isRevoked: false },
            { isRevoked: true }
        );

        return { message: 'Tizimdan chiqish muvaffaqiyatli amalga oshirildi' };
    }

    private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = { sub: user.id, email: user.email, role: user.role };

        // Generate access token
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES', '15m'),
        });

        // Generate refresh token
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES', '7d'),
        });

        // Save refresh token to database
        const expiresIn = parseInt(this.configService.get('JWT_REFRESH_EXPIRES_DAYS', '7'));
        await this.tokenRepository.save({
            token: refreshToken,
            expiresAt: addDays(new Date(), expiresIn),
            userId: user.id,
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
