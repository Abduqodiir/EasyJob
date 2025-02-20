import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { 
    IsString, 
    IsEmail, 
    IsEnum, 
    IsOptional, 
    IsPhoneNumber,
    IsUrl,
    MinLength,
    MaxLength,
    Matches
} from 'class-validator';
import { UserRole } from 'src/modules/enums';
import { CreateUserRequest, UserInterface } from '../interfaces';

export class CreateUserDto implements CreateUserRequest {
    @ApiProperty({ 
        example: 'John',
        description: 'User\'s first name'
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    firstName: string;

    @ApiProperty({ 
        example: 'Doe',
        description: 'User\'s last name'
    })
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    lastName: string;

    @ApiProperty({ 
        example: 'john.doe@example.com',
        description: 'User\'s email address'
    })
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @ApiProperty({ 
        example: 'StrongPass123!',
        description: 'User\'s password (min 8 chars, must contain number and special char)'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'Password is too weak' }
    )
    password: string;

    @ApiProperty({ 
        example: '+998901234567',
        description: 'User\'s phone number',
        required: false
    })
    @IsOptional()
    @IsPhoneNumber('UZ')
    phoneNumber?: string;

    @ApiProperty({ 
        type: 'string',
        format: 'binary',
        required: false,
        description: 'User\'s avatar image'
    })
    @IsOptional()
    avatar?: string;

    @ApiProperty({ 
        example: 'Experienced software engineer passionate about web development',
        required: false,
        description: 'User\'s bio'
    })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    bio?: string;

    @ApiProperty({ 
        enum: UserRole,
        example: UserRole.USER,
        required: false,
        description: 'User\'s role in the system'
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiProperty({ 
        example: 'Tech Solutions LLC',
        required: false,
        description: 'Company name (for employers)'
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    companyName?: string;

    @ApiProperty({ 
        example: 'https://techsolutions.com',
        required: false,
        description: 'Company website URL'
    })
    @IsOptional()
    @IsUrl()
    companyWebsite?: string;

    @ApiProperty({ 
        type: 'string',
        format: 'binary',
        required: false,
        description: 'Company logo image'
    })
    @IsOptional()
    companyLogo?: string;

    @ApiProperty({ 
        example: 'Leading technology solutions provider...',
        required: false,
        description: 'Company description'
    })
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    companyDescription?: string;

    @ApiProperty({ 
        example: '123 Business Street, Tashkent, Uzbekistan',
        required: false,
        description: 'Company physical address'
    })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    companyAddress?: string;
}


export class UserResponseDto implements Omit<UserInterface, 'password'> {
    @ApiProperty({ example: 'uuid-string' })
    id: string;

    @ApiProperty({ example: 'John' })
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    lastName: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ example: '+998901234567' })
    phoneNumber: string;

    @ApiProperty({ required: false })
    avatar?: string;

    @ApiProperty({ required: false })
    bio?: string;

    @ApiProperty({ enum: UserRole })
    role: UserRole;

    @ApiProperty({ required: false })
    companyName?: string;

    @ApiProperty({ required: false })
    companyWebsite?: string;

    @ApiProperty({ required: false })
    companyLogo?: string;

    @ApiProperty({ required: false })
    companyDescription?: string;

    @ApiProperty({ required: false })
    companyAddress?: string;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: false })
    isVerified: boolean;

    @ApiProperty({ required: false })
    lastLoginAt?: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}