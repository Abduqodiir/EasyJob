import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users'; 
import { Token } from './entities/token.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailModule } from '../mail'; 

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Token]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_ACCESS_SECRET'),
                signOptions: {
                    expiresIn: configService.get('JWT_ACCESS_EXPIRES', '15m'),
                },
            }),
        }),
        MailModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy],
})
export class AuthModule { }