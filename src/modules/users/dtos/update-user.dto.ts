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
import { UpdateUserRequest } from '../interfaces';
export class UpdateUserDto implements UpdateUserRequest {
    @ApiProperty({ 
        example: 'John',
        required: false,
        description: 'User\'s first name'
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    firstName?: string;

    @ApiProperty({ 
        example: 'Doe',
        required: false,
        description: 'User\'s last name'
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    lastName?: string;

    @ApiProperty({ 
        example: 'john.doe@example.com',
        required: false,
        description: 'User\'s email address'
    })
    @IsOptional()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email?: string;

    @ApiProperty({ 
        example: 'NewStrongPass123!',
        required: false,
        description: 'User\'s new password'
    })
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'Password is too weak' }
    )
    password?: string;

    @ApiProperty({ 
        example: '+998901234567',
        required: false,
        description: 'User\'s phone number'
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
        example: 'Experienced software engineer...',
        required: false,
        description: 'User\'s bio'
    })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    bio?: string;

    @ApiProperty({ 
        enum: UserRole,
        example: UserRole.EMPLOYER,
        required: false,
        description: 'User\'s role'
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiProperty({ 
        example: 'Tech Solutions LLC',
        required: false,
        description: 'Company name'
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    companyName?: string;

    @ApiProperty({ 
        example: 'https://techsolutions.com',
        required: false,
        description: 'Company website'
    })
    @IsOptional()
    @IsUrl()
    companyWebsite?: string;

    @ApiProperty({ 
        type: 'string',
        format: 'binary',
        required: false,
        description: 'Company logo'
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
        example: '123 Business Street, Tashkent',
        required: false,
        description: 'Company address'
    })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    companyAddress?: string;

    @ApiProperty({ 
        example: true,
        required: false,
        description: 'User account status'
    })
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ 
        example: true,
        required: false,
        description: 'Email verification status'
    })
    @IsOptional()
    isVerified?: boolean;
}
