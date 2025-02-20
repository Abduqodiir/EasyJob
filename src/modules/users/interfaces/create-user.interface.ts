import { UserRole } from "src/modules/enums";

export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    avatar?: string;
    bio?: string;
    role: UserRole;
    companyName?: string;
    companyWebsite?: string;
    companyLogo?: string;
    companyDescription?: string;
    companyAddress?: string;
    isActive: boolean;
    isVerified: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    avatar?: string;
    bio?: string;
    role?: UserRole;
    companyName?: string;
    companyWebsite?: string;
    companyLogo?: string;
    companyDescription?: string;
    companyAddress?: string;
}