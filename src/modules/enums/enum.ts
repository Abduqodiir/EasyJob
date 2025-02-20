export enum JobRemoteType {
    FULLY_REMOTE = 'fully-remote',
    HYBRID = 'hybrid',
    ON_SITE = 'on-site'
}

export enum JobType {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    CONTRACT = 'contract',
    INTERNSHIP = 'internship',
    TEMPORARY = 'temporary'
}

export enum ExperienceLevel {
    ENTRY = 'entry',
    MID_LEVEL = 'mid-level',
    SENIOR = 'senior',
    LEAD = 'lead',
    EXECUTIVE = 'executive'
}

export enum ApplicationStatus {
    PENDING = 'pending',
    REVIEWING = 'reviewing',
    SHORTLISTED = 'shortlisted',
    INTERVIEWED = 'interviewed',
    OFFERED = 'offered',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}

export enum InterviewType {
    IN_PERSON = 'in-person',
    PHONE = 'phone',
    VIDEO = 'video',
    TECHNICAL = 'technical',
    GROUP = 'group'
}


export enum UserRole {
    USER = 'user',
    EMPLOYER = 'employer',
    ADMIN = 'admin'
}