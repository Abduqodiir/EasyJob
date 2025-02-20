import { ExperienceLevel, JobRemoteType, JobType } from "src/modules/enums";

export interface CreateJobRequest {
    title: string;
    description: string;
    location: string;
    remoteType?: JobRemoteType;
    salaryFrom: number;
    salaryTo: number;
    currency: string;
    jobType: JobType;
    experienceLevel: ExperienceLevel;
    requiredSkills: string[];
    benefits?: {
        type: string;
        description: string;
    }[];
    deadline?: Date;
    isActive?: boolean;
    categories?: string[];
    requirements?: {
        education?: string[];
        experience?: string[];
        skills?: string[];
        other?: string[];
    };
    department?: string;
    employerId: string;
}


export interface JobResponse {
    id: string;
    title: string;
    description: string;
    location: string;
    remoteType?: JobRemoteType;
    salaryFrom: number;
    salaryTo: number;
    currency: string;
    jobType: JobType;
    experienceLevel: ExperienceLevel;
    requiredSkills: string[];
    benefits?: {
        type: string;
        description: string;
    }[];
    deadline?: Date;
    isActive: boolean;
    views: number;
    categories?: string[];
    applicationsCount: number;
    requirements?: {
        education?: string[];
        experience?: string[];
        skills?: string[];
        other?: string[];
    };
    department?: string;
    createdAt: Date;
    updatedAt: Date;
    employerId: string;
}

export interface JobsListResponse {
    items: JobResponse[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}