import { ApiProperty } from "@nestjs/swagger";
import { 
    IsArray, IsBoolean, IsDate, IsEnum, IsNumber, 
    IsObject, IsOptional, IsString, IsUUID 
} from "class-validator";
import { ExperienceLevel, JobRemoteType, JobType } from "src/modules/enums";
import { CreateJobRequest } from "../interfaces";

export class RequirementsDto {
    @ApiProperty({ type: [String], example: ["Bachelor's degree in Computer Science or related field"] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    education?: string[];

    @ApiProperty({ type: [String], example: ["5+ years of experience with Node.js"] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    experience?: string[];

    @ApiProperty({ type: [String], example: ["TypeScript", "NestJS", "PostgreSQL"] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    skills?: string[];

    @ApiProperty({ type: [String], example: ["Good communication skills"] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    other?: string[];
}

export class CreateJobDto implements CreateJobRequest {
    @ApiProperty({ example: "Senior Backend Developer" })
    @IsString()
    title: string;

    @ApiProperty({ example: "We are looking for an experienced backend developer..." })
    @IsString()
    description: string;

    @ApiProperty({ example: "New York, NY" })
    @IsString()
    location: string;

    @ApiProperty({ enum: JobRemoteType, example: JobRemoteType.HYBRID })
    @IsEnum(JobRemoteType)
    @IsOptional()
    remoteType?: JobRemoteType;

    @ApiProperty({ example: 80000 })
    @IsNumber()
    salaryFrom: number;

    @ApiProperty({ example: 120000 })
    @IsNumber()
    salaryTo: number;

    @ApiProperty({ example: "USD" })
    @IsString()
    currency: string;

    @ApiProperty({ enum: JobType, example: JobType.FULL_TIME })
    @IsEnum(JobType)
    jobType: JobType;

    @ApiProperty({ enum: ExperienceLevel, example: ExperienceLevel.SENIOR })
    @IsEnum(ExperienceLevel)
    experienceLevel: ExperienceLevel;

    @ApiProperty({ type: [String], example: ["Node.js", "TypeScript", "NestJS"] })
    @IsArray()
    @IsString({ each: true })
    requiredSkills: string[];

    @ApiProperty({ 
        type: "array", 
        example: [
            { type: "Health", description: "Comprehensive health insurance" },
            { type: "PTO", description: "Unlimited paid time off" }
        ] 
    })
    @IsOptional()
    @IsArray()
    benefits?: { type: string; description: string }[];

    @ApiProperty({ example: "2025-04-30" })
    @IsOptional()
    @IsDate()
    deadline?: Date;

    @ApiProperty({ default: true, example: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({ type: [String], example: ["Engineering", "Technology"] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories?: string[];

    @ApiProperty({ type: () => RequirementsDto, example: {
        education: ["Bachelor's degree in Computer Science or related field"],
        experience: ["5+ years of experience with Node.js"],
        skills: ["TypeScript", "NestJS", "PostgreSQL"],
        other: ["Good communication skills"]
    }})
    @IsOptional()
    @IsObject()
    requirements?: RequirementsDto;


    @ApiProperty({ example: "Engineering" })
    @IsOptional()
    @IsString()
    department?: string;

    @ApiProperty({ example: "uuid-of-employer" })
    @IsUUID()
    employerId: string;
}
