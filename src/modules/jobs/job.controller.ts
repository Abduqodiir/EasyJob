import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { JobService } from "./job.service";
import { Job } from "./models"
import { CreateJobDto, UpdateJobDto } from "./dtos";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";

@ApiTags("Jobs")
@Controller("jobs")
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @ApiOperation({ summary: "Hamma joblarni olish", description: "Barcha mavjud joblarni qaytaradi." })
    @ApiResponse({ status: 200, description: "Joblar ro'yxati qaytarildi", type: [Job] })
    @Get()
    async getAllJobs(): Promise<Job[]> {
        return this.jobService.getAllJobs();
    }

    @ApiOperation({ summary: "Yagona jobni olish", description: "Berilgan ID bo'yicha jobni qaytaradi." })
    @ApiParam({ name: "id", type: "string", description: "Job ID si" })
    @ApiResponse({ status: 200, description: "Topilgan job", type: Job })
    @ApiResponse({ status: 404, description: "Job topilmadi" })
    @Get(":id")
    async getSingleJob(@Param("id") id: string): Promise<Job> {
        return this.jobService.getSingleJob(id);
    }

    @ApiOperation({ summary: "Job yaratish", description: "Yangi job yaratish uchun" })
    @ApiBody({ type: CreateJobDto })
    @ApiResponse({ status: 201, description: "Job muvaffaqiyatli yaratildi", type: Job })
    @Post("add")
    async createJob(
        @Body() createJobPayload: CreateJobDto
    ): Promise<{ message: string; newJob: Job }> {
        return this.jobService.createJob(createJobPayload);
    }

    @ApiOperation({ summary: "Job yangilash", description: "Berilgan ID ga ega job ma'lumotlarini yangilash." })
    @ApiParam({ name: "id", type: "string", description: "Job ID si" })
    @ApiBody({ type: UpdateJobDto })
    @ApiResponse({ status: 200, description: "Job muvaffaqiyatli yangilandi", type: Job })
    @Put(":id")
    async updateJob(
        @Param("id") id: string,
        @Body() updateJobPayload: UpdateJobDto
    ): Promise<{ message: string; updatedJob: Job }> {
        return this.jobService.updateJob(id, updateJobPayload);
    }

    @ApiOperation({ summary: "Jobni o‘chirish", description: "Berilgan ID bo‘yicha jobni o‘chirish." })
    @ApiParam({ name: "id", type: "string", description: "Job ID si" })
    @ApiResponse({ status: 200, description: "Job muvaffaqiyatli o‘chirildi" })
    @ApiResponse({ status: 404, description: "Job topilmadi" })
    @Delete(":id")
    async deleteJob(@Param("id") id: string): Promise<{ message: string }> {
        return this.jobService.deleteJob(id);
    }
}
