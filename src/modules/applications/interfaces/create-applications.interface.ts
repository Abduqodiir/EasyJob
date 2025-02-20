import { ApplicationStatus, InterviewType } from "src/modules/enums";

export interface CreateApplicationRequest {
    coverLetter: string;
    status?: ApplicationStatus;
    expectedSalary?: number;
    noticePeriod?: string;
    rejectionReason?: string;
    resumeUrl?: string;
    additionalDocuments?: {
        name: string;
        url: string;
        type: string;
        uploadedAt: Date;
    }[];
    interviewDetails?: {
        scheduledAt: Date;
        type: InterviewType;
        location?: string;
        notes?: string;
        interviewer?: string;
        feedback?: string;
        rating?: number;
    }[];
    userId: string;
    jobId: string;
}