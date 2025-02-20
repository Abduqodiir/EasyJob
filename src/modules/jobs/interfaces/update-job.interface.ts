import { ExperienceLevel, JobRemoteType, JobType } from "src/modules/enums";

export interface UpdateJobRequest {
    title?: string;
    description?: string;
    location?: string;
    remoteType?: JobRemoteType;
    salaryFrom?: number;
    salaryTo?: number;
    currency?: string;
    jobType?: JobType;
    experienceLevel?: ExperienceLevel;
    requiredSkills?: string[];
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
    employerId?: string;
}