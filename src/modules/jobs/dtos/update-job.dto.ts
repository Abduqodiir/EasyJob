import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsObject, IsOptional, IsString, IsUUID } from "class-validator";
import { ExperienceLevel, JobRemoteType, JobType } from "src/modules/enums";
import { CreateJobDto, RequirementsDto } from "./create-job.dto";
export class UpdateJobDto implements Partial<CreateJobDto> {
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    location?: string;

    @ApiProperty({ enum: JobRemoteType, required: false })
    @IsEnum(JobRemoteType)
    @IsOptional()
    remoteType?: JobRemoteType;

    @ApiProperty({ type: Number, required: false })
    @IsNumber()
    @IsOptional()
    salaryFrom?: number;

    @ApiProperty({ type: Number, required: false })
    @IsNumber()
    @IsOptional()
    salaryTo?: number;

    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    currency?: string;

    @ApiProperty({ enum: JobType, required: false })
    @IsEnum(JobType)
    @IsOptional()
    jobType?: JobType;

    @ApiProperty({ enum: ExperienceLevel, required: false })
    @IsEnum(ExperienceLevel)
    @IsOptional()
    experienceLevel?: ExperienceLevel;

    @ApiProperty({ type: [String], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    requiredSkills?: string[];

    @ApiProperty({ type: "array", required: false })
    @IsOptional()
    @IsArray()
    benefits?: {
        type: string;
        description: string;
    }[];

    @ApiProperty({ type: Date, required: false })
    @IsOptional()
    @IsDate()
    deadline?: Date;

    @ApiProperty({ type: Boolean, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({ type: [String], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories?: string[];

    @ApiProperty({ type: () => RequirementsDto, required: false })
    @IsOptional()
    @IsObject()
    requirements?: RequirementsDto;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    department?: string;
}