import { ApiProperty } from "@nestjs/swagger";
import { CreateApplicationRequest } from "../interfaces";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ApplicationStatus, InterviewType } from "src/modules/enums";

export class CreateApplicationDto implements CreateApplicationRequest {
    @ApiProperty({ type: String, required: true, example: "This is my cover letter" })
    @IsString()
    coverLetter: string;

    @ApiProperty({ enum: ApplicationStatus, default: ApplicationStatus.PENDING })
    @IsEnum(ApplicationStatus)
    @IsOptional()
    status?: ApplicationStatus;

    @ApiProperty({ type: Number, required: false, example: 50000 })
    @IsOptional()
    @IsNumber()
    expectedSalary?: number;

    @ApiProperty({ type: String, required: false, example: "2 weeks" })
    @IsOptional()
    @IsString()
    noticePeriod?: string;

    @ApiProperty({ type: String, required: false, example: "Not a good fit" })
    @IsOptional()
    @IsString()
    rejectionReason?: string;

    @ApiProperty({ type: String, required: false, example: "https://example.com/resume.pdf" })
    @IsOptional()
    @IsString()
    resumeUrl?: string;

    @ApiProperty({ type: "array", required: false, example: [{ name: "Document", url: "https://example.com/doc.pdf", type: "PDF", uploadedAt: new Date() }] })
    @IsOptional()
    @IsArray()
    additionalDocuments?: {
        name: string;
        url: string;
        type: string;
        uploadedAt: Date;
    }[];

    @ApiProperty({ type: "array", required: false, example: [{ scheduledAt: new Date(), type: InterviewType.TECHNICAL, location: "Office", notes: "Bring resume", interviewer: "John Doe", feedback: "Good candidate", rating: 4.5 }] })
    @IsOptional()
    @IsArray()
    interviewDetails?: {
        scheduledAt: Date;
        type: InterviewType;
        location?: string;
        notes?: string;
        interviewer?: string;
        feedback?: string;
        rating?: number;
    }[];

    @ApiProperty({ type: String, required: true, example: "uuid-of-user" })
    @IsUUID()
    userId: string;

    @ApiProperty({ type: String, required: true, example: "uuid-of-job" })
    @IsUUID()
    jobId: string;
}