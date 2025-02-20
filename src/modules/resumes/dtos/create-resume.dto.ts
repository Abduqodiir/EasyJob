import { ApiProperty } from "@nestjs/swagger";
import { CertificateInterface, CreateResumeRequest, EducationInterface, ExperienceInterface, ProjectInterface } from "../interfaces";
import { Type } from 'class-transformer';
import { IsString, IsDate, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';

export class ExperienceDto implements ExperienceInterface {
    @ApiProperty({ example: 'Google Inc.' })
    @IsString()
    company: string;

    @ApiProperty({ example: 'Senior Software Engineer' })
    @IsString()
    position: string;

    @ApiProperty({ example: new Date('2020-01-01') })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty({ example: new Date('2023-01-01') })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @ApiProperty({ example: 'Worked on developing cloud infrastructure...' })
    @IsString()
    description: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    isCurrentlyWorking: boolean;

    @ApiProperty({ example: 'Mountain View, CA', required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ example: ['Increased system performance by 40%'], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    achievements?: string[];

    @ApiProperty({ example: ['Node.js', 'Kubernetes'], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    technologies?: string[];
}

// dtos/education.dto.ts
export class EducationDto implements EducationInterface {
    @ApiProperty({ example: 'MIT' })
    @IsString()
    institution: string;

    @ApiProperty({ example: "Bachelor's Degree" })
    @IsString()
    degree: string;

    @ApiProperty({ example: 'Computer Science' })
    @IsString()
    field: string;

    @ApiProperty({ example: new Date('2016-09-01') })
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty({ example: new Date('2020-06-01') })
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @ApiProperty({ example: 'Specialized in Artificial Intelligence' })
    @IsString()
    description: string;

    @ApiProperty({ example: '3.8 GPA', required: false })
    @IsOptional()
    @IsString()
    grade?: string;

    @ApiProperty({ example: ['Dean\'s List', 'Best Thesis Award'], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    achievements?: string[];
}

// dtos/certificate.dto.ts
export class CertificateDto implements CertificateInterface {
    @ApiProperty({ example: 'AWS Certified Solutions Architect' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Amazon Web Services' })
    @IsString()
    issuer: string;

    @ApiProperty({ example: new Date() })
    @Type(() => Date)
    @IsDate()
    date: Date;

    @ApiProperty({ example: new Date(), required: false })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    expiryDate?: Date;

    @ApiProperty({ example: 'AWS-123456', required: false })
    @IsOptional()
    @IsString()
    credentialId?: string;

    @ApiProperty({ example: 'https://aws.amazon.com/verify', required: false })
    @IsOptional()
    @IsString()
    url?: string;
}

// dtos/project.dto.ts
export class ProjectDto implements ProjectInterface {
    @ApiProperty({ example: 'E-commerce Platform' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Built a full-stack e-commerce solution' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'https://github.com/project', required: false })
    @IsOptional()
    @IsString()
    url?: string;

    @ApiProperty({ example: new Date(), required: false })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @ApiProperty({ example: new Date(), required: false })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

    @ApiProperty({ example: ['React', 'Node.js'], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    technologies?: string[];

    @ApiProperty({ example: 'Lead Developer', required: false })
    @IsOptional()
    @IsString()
    role?: string;
}

// dtos/create-resume.dto.ts
export class SkillDto {
    @ApiProperty({ example: 'Programming Languages' })
    @IsString()
    category: string;

    @ApiProperty({ example: ['JavaScript', 'Python'] })
    @IsArray()
    @IsString({ each: true })
    items: string[];

    @ApiProperty({ example: 'advanced', enum: ['beginner', 'intermediate', 'advanced', 'expert'], required: false })
    @IsOptional()
    @IsString()
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export class LanguageDto {
    @ApiProperty({ example: 'English' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'fluent', enum: ['basic', 'intermediate', 'fluent', 'native'] })
    @IsString()
    level: 'basic' | 'intermediate' | 'fluent' | 'native';
}

export class CreateResumeDto implements CreateResumeRequest {
    @ApiProperty({ example: 'Senior Developer Resume' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Experienced software engineer with 5+ years...' })
    @IsString()
    summary: string;

    @ApiProperty({ type: [ExperienceDto] })
    @ValidateNested({ each: true })
    @Type(() => ExperienceDto)
    @IsArray()
    experience: ExperienceDto[];

    @ApiProperty({ type: [EducationDto] })
    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    @IsArray()
    education: EducationDto[];

    @ApiProperty({ type: [SkillDto] })
    @ValidateNested({ each: true })
    @Type(() => SkillDto)
    @IsArray()
    skills: SkillDto[];

    @ApiProperty({ type: [LanguageDto], required: false })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => LanguageDto)
    @IsArray()
    languages?: LanguageDto[];

    @ApiProperty({ type: [CertificateDto], required: false })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CertificateDto)
    @IsArray()
    certificates?: CertificateDto[];

    @ApiProperty({ example: ['Reading', 'Traveling'], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];

    @ApiProperty({ example: 'https://johndoe.com', required: false })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ example: 'https://linkedin.com/in/johndoe', required: false })
    @IsOptional()
    @IsString()
    linkedin?: string;

    @ApiProperty({ example: 'https://github.com/johndoe', required: false })
    @IsOptional()
    @IsString()
    github?: string;

    @ApiProperty({ example: 'https://portfolio.johndoe.com', required: false })
    @IsOptional()
    @IsString()
    portfolio?: string;

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;

    @ApiProperty({ example: 'modern-template-1', required: false })
    @IsOptional()
    @IsString()
    templateId?: string;

    @ApiProperty({ type: [ProjectDto], required: false })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProjectDto)
    @IsArray()
    projects?: ProjectDto[];
}