import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./models"; 
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { FileService } from "../file/file.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly fileService: FileService
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getSingleUser(id: string): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async createUser(payload: CreateUserDto, file?: Express.Multer.File): Promise<{ message: string; newUser: User }> {
        let avatar: string | undefined;
        if (file) {
            avatar = await this.fileService.uploadFile(file);
        }

        const newUser = this.userRepository.create({ ...payload, avatar });
        await this.userRepository.save(newUser);

        return {
            message: "User created successfully",
            newUser,
        };
    }

    async updateUser(id: string, payload: UpdateUserDto, file?: Express.Multer.File): Promise<{ message: string; updatedUser: User }> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }

        if (file) {
            if (user.avatar) {
                await this.fileService.deleteFile(user.avatar);
            }
            payload.avatar = await this.fileService.uploadFile(file);
        }

        await this.userRepository.update(id, payload);
        const updatedUser = await this.userRepository.findOne({ where: { id } });

        return {
            message: "User updated successfully",
            updatedUser,
        };
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }

        if (user.avatar) {
            await this.fileService.deleteFile(user.avatar);
        }

        await this.userRepository.remove(user);

        return {
            message: "User deleted successfully",
        };
    }
}
