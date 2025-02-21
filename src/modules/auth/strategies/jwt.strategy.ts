import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findOne({ where: { id: payload.sub } });

        if (!user || !user.isActive) {
            throw new UnauthorizedException('Foydalanuvchi topilmadi yoki bloklangan');
        }

        return {
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
}
