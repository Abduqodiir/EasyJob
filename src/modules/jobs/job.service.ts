import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./models";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobDto, UpdateJobDto } from "./dtos";

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(Job)
        private readonly jobRepository: Repository<Job>
    ) {}

    async getAllJobs(): Promise<Job[]> {
        return await this.jobRepository.find({ relations: ["employer", "applications"] });
    }

    async getSingleJob(id: string): Promise<Job> {
        const job = await this.jobRepository.findOne({ where: { id }, relations: ["employer", "applications"] });
        if (!job) {
            throw new NotFoundException("Job not found");
        }
        return job;
    }

    async createJob(payload: CreateJobDto): Promise<{ message: string; newJob: Job }> {
        const newJob = this.jobRepository.create(payload);
        await this.jobRepository.save(newJob);
        return {
            message: "Job created successfully",
            newJob,
        };
    }

    async updateJob(id: string, payload: UpdateJobDto): Promise<{ message: string; updatedJob: Job }> {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new NotFoundException("Job not found");
        }

        await this.jobRepository.update(id, payload);
        const updatedJob = await this.jobRepository.findOne({ where: { id } });

        return {
            message: "Job updated successfully",
            updatedJob,
        };
    }

    async deleteJob(id: string): Promise<{ message: string }> {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new NotFoundException("Job not found");
        }

        await this.jobRepository.remove(job);
        return {
            message: "Job deleted successfully",
        };
    }
}
