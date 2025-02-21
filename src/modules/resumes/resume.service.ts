import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Resume } from "./models"
import { CreateResumeDto, UpdateResumeDto } from "./dtos";

@Injectable()
export class ResumeService {
    constructor(
        @InjectRepository(Resume)
        private readonly resumeRepository: Repository<Resume>
    ) {}

    async getAllResumes(): Promise<Resume[]> {
        return await this.resumeRepository.find({ relations: ["user"] });
    }

    async getSingleResume(id: string): Promise<Resume> {
        const resume = await this.resumeRepository.findOne({ where: { id }, relations: ["user"] });
        if (!resume) {
            throw new NotFoundException("Resume not found");
        }
        return resume;
    }

    async createResume(payload: CreateResumeDto): Promise<{ message: string; newResume: Resume }> {
        const newResume = this.resumeRepository.create(payload);
        await this.resumeRepository.save(newResume);
        return {
            message: "Resume created successfully",
            newResume,
        };
    }

    async updateResume(id: string, payload: UpdateResumeDto): Promise<{ message: string; updatedResume: Resume }> {
        const resume = await this.resumeRepository.findOne({ where: { id } });
        if (!resume) {
            throw new NotFoundException("Resume not found");
        }

        await this.resumeRepository.update(id, payload);
        const updatedResume = await this.resumeRepository.findOne({ where: { id } });

        return {
            message: "Resume updated successfully",
            updatedResume,
        };
    }

    async deleteResume(id: string): Promise<{ message: string }> {
        const resume = await this.resumeRepository.findOne({ where: { id } });
        if (!resume) {
            throw new NotFoundException("Resume not found");
        }

        await this.resumeRepository.remove(resume);
        return {
            message: "Resume deleted successfully",
        };
    }
}
