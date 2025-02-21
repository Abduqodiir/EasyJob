import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'Ism bo\'sh bo\'lishi mumkin emas' })
    @IsString({ message: 'Ism string formatida bo\'lishi kerak' })
    firstName: string;

    @IsNotEmpty({ message: 'Familiya bo\'sh bo\'lishi mumkin emas' })
    @IsString({ message: 'Familiya string formatida bo\'lishi kerak' })
    lastName: string;

    @IsNotEmpty({ message: 'Email bo\'sh bo\'lishi mumkin emas' })
    @IsEmail({}, { message: 'Email formati noto\'g\'ri' })
    email: string;

    @IsNotEmpty({ message: 'Parol bo\'sh bo\'lishi mumkin emas' })
    @MinLength(8, { message: 'Parol minimum 8 ta belgidan iborat bo\'lishi kerak' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Parol kamida 1 ta katta harf, 1 ta kichik harf va 1 ta raqam yoki maxsus belgi o\'z ichiga olishi kerak',
    })
    password: string;

    @IsNotEmpty({ message: 'Telefon raqami bo\'sh bo\'lishi mumkin emas' })
    @Matches(/^998[0-9]{9}$/, { message: 'Telefon raqami formati noto\'g\'ri. 998XXXXXXXXX formatida kiriting' })
    phoneNumber: string;
}

export class LoginDto {
    @IsNotEmpty({ message: 'Email bo\'sh bo\'lishi mumkin emas' })
    @IsEmail({}, { message: 'Email formati noto\'g\'ri' })
    email: string;

    @IsNotEmpty({ message: 'Parol bo\'sh bo\'lishi mumkin emas' })
    password: string;
}

export class RefreshTokenDto {
    @IsNotEmpty({ message: 'Refresh token bo\'sh bo\'lishi mumkin emas' })
    refreshToken: string;
}

export class ResetPasswordDto {
    @IsNotEmpty({ message: 'Yangi parol bo\'sh bo\'lishi mumkin emas' })
    @MinLength(8, { message: 'Parol minimum 8 ta belgidan iborat bo\'lishi kerak' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Parol kamida 1 ta katta harf, 1 ta kichik harf va 1 ta raqam yoki maxsus belgi o\'z ichiga olishi kerak',
    })
    newPassword: string;

    @IsNotEmpty({ message: 'Token bo\'sh bo\'lishi mumkin emas' })
    token: string;
}