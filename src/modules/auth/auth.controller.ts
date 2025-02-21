import { Controller, Post, Body, Get, Param, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ResetPasswordDto } from './dtos';
import { JwtAuthGuard } from '@guards'; 
import { RolesGuard } from '@guards'; 
import { Roles } from '@decorators'; 
import { UserRole } from 'src/modules/enums';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Autentifikatsiya')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Foydalanuvchi ro\'yxatdan o\'tkazish' })
    @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi' })
    @ApiResponse({ status: 409, description: 'Bunday email bilan foydalanuvchi allaqachon ro\'yxatdan o\'tgan' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Tizimga kirish' })
    @ApiResponse({ status: 200, description: 'Muvaffaqiyatli kirish' })
    @ApiResponse({ status: 401, description: 'Email yoki parol noto\'g\'ri' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Access tokenni yangilash' })
    @ApiResponse({ status: 200, description: 'Token muvaffaqiyatli yangilandi' })
    @ApiResponse({ status: 401, description: 'Refresh token yaroqsiz' })
    @ApiBody({ type: RefreshTokenDto })
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }

    @Get('verify-email/:token')
    @ApiOperation({ summary: 'Emailni tasdiqlash' })
    @ApiResponse({ status: 200, description: 'Email muvaffaqiyatli tasdiqlandi' })
    @ApiResponse({ status: 400, description: 'Tasdiq kodi yaroqsiz yoki muddati tugagan' })
    async verifyEmail(@Param('token') token: string) {
        return this.authService.verifyEmail(token);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Parolni tiklash uchun so\'rov yuborish' })
    @ApiResponse({ status: 200, description: 'Parolni tiklash uchun ko\'rsatmalar email orqali yuborildi' })
    async forgotPassword(@Body('email') email: string) {
        return this.authService.forgotPassword(email);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Parolni yangilash' })
    @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli o\'zgartirildi' })
    @ApiResponse({ status: 400, description: 'Parolni tiklash kodi yaroqsiz yoki muddati tugagan' })
    @ApiBody({ type: ResetPasswordDto })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Tizimdan chiqish' })
    @ApiResponse({ status: 200, description: 'Tizimdan chiqish muvaffaqiyatli amalga oshirildi' })
    @ApiBearerAuth()
    async logout(@Req() req) {
        return this.authService.logout(req.user.sub);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Joriy foydalanuvchi ma\'lumotlarini olish' })
    @ApiResponse({ status: 200, description: 'Foydalanuvchi ma\'lumotlari' })
    @ApiBearerAuth()
    async getProfile(@Req() req) {
        // The user object is already attached to the request by the auth guard
        return req.user;
    }

    @Get('admin/check')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Admin huquqlarini tekshirish' })
    @ApiResponse({ status: 200, description: 'Foydalanuvchi admin huquqlariga ega' })
    @ApiResponse({ status: 403, description: 'Foydalanuvchi admin huquqlariga ega emas' })
    @ApiBearerAuth()
    async checkAdminAccess() {
        return { message: 'Admin huquqlariga ega' };
    }
}