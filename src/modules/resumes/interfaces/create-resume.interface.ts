export interface ExperienceInterface {
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
    description: string;
    isCurrentlyWorking: boolean;
    location?: string;
    achievements?: string[];
    technologies?: string[];
}

export interface EducationInterface {
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date;
    description: string;
    grade?: string;
    achievements?: string[];
}

export interface CertificateInterface {
    name: string;
    issuer: string;
    date: Date;
    expiryDate?: Date;
    credentialId?: string;
    url?: string;
}

export interface ProjectInterface {
    name: string;
    description: string;
    url?: string;
    startDate?: Date;
    endDate?: Date;
    technologies?: string[];
    role?: string;
}

export interface CreateResumeRequest {
    title: string;
    summary: string;
    experience: ExperienceInterface[];
    education: EducationInterface[];
    skills: {
        category: string;
        items: string[];
        level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    }[];
    languages?: {
        name: string;
        level: 'basic' | 'intermediate' | 'fluent' | 'native';
    }[];
    certificates?: CertificateInterface[];
    interests?: string[];
    website?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    isPublic?: boolean;
    templateId?: string;
    projects?: ProjectInterface[];
}