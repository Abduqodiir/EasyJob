import { CreateUserRequest } from "./create-user.interface";

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
    isActive?: boolean;
    isVerified?: boolean;
}