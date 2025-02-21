import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application } from "./models"
import { CreateApplicationDto, UpdateApplicationDto } from "./dtos";

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>
    ) {}

    async getAllApplications(): Promise<Application[]> {
        return await this.applicationRepository.find({ relations: ["user", "job"] });
    }

    async getSingleApplication(id: string): Promise<Application> {
        const application = await this.applicationRepository.findOne({ where: { id }, relations: ["user", "job"] });
        if (!application) {
            throw new NotFoundException("Application not found");
        }
        return application;
    }

    async createApplication(payload: CreateApplicationDto): Promise<{ message: string; newApplication: Application }> {
        const newApplication = this.applicationRepository.create(payload);
        await this.applicationRepository.save(newApplication);
        return {
            message: "Application created successfully",
            newApplication,
        };
    }

    async updateApplication(id: string, payload: UpdateApplicationDto): Promise<{ message: string; updatedApplication: Application }> {
        const application = await this.applicationRepository.findOne({ where: { id } });
        if (!application) {
            throw new NotFoundException("Application not found");
        }

        await this.applicationRepository.update(id, payload);
        const updatedApplication = await this.applicationRepository.findOne({ where: { id } });

        return {
            message: "Application updated successfully",
            updatedApplication,
        };
    }

    async deleteApplication(id: string): Promise<{ message: string }> {
        const application = await this.applicationRepository.findOne({ where: { id } });
        if (!application) {
            throw new NotFoundException("Application not found");
        }

        await this.applicationRepository.remove(application);
        return {
            message: "Application deleted successfully",
        };
    }
}
