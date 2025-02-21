import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ResumeService } from "./resume.service";
import { Resume } from "./models"
import { CreateResumeDto, UpdateResumeDto } from "./dtos";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";

@ApiTags("Resumes")
@Controller("resumes")
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {}

    @ApiOperation({ summary: "Hamma resume larni olish", description: "Barcha mavjud resume larni qaytaradi." })
    @ApiResponse({ status: 200, description: "Resumelar ro'yxati qaytarildi", type: [Resume] })
    @Get()
    async getAllResumes(): Promise<Resume[]> {
        return this.resumeService.getAllResumes();
    }

    @ApiOperation({ summary: "Yagona resume ni olish", description: "Berilgan ID bo'yicha resume ni qaytaradi." })
    @ApiParam({ name: "id", type: "string", description: "Resume ID si" })
    @ApiResponse({ status: 200, description: "Topilgan resume", type: Resume })
    @ApiResponse({ status: 404, description: "Resume topilmadi" })
    @Get(":id")
    async getSingleResume(@Param("id") id: string): Promise<Resume> {
        return this.resumeService.getSingleResume(id);
    }

    @ApiOperation({ summary: "Resume yaratish", description: "Yangi resume yaratish uchun" })
    @ApiBody({ type: CreateResumeDto })
    @ApiResponse({ status: 201, description: "Resume muvaffaqiyatli yaratildi", type: Resume })
    @Post("add")
    async createResume(
        @Body() createResumePayload: CreateResumeDto
    ): Promise<{ message: string; newResume: Resume }> {
        return this.resumeService.createResume(createResumePayload);
    }

    @ApiOperation({ summary: "Resume yangilash", description: "Berilgan ID ga ega resume ma'lumotlarini yangilash." })
    @ApiParam({ name: "id", type: "string", description: "Resume ID si" })
    @ApiBody({ type: UpdateResumeDto })
    @ApiResponse({ status: 200, description: "Resume muvaffaqiyatli yangilandi", type: Resume })
    @Put(":id")
    async updateResume(
        @Param("id") id: string,
        @Body() updateResumePayload: UpdateResumeDto
    ): Promise<{ message: string; updatedResume: Resume }> {
        return this.resumeService.updateResume(id, updateResumePayload);
    }

    @ApiOperation({ summary: "Resume ni o‘chirish", description: "Berilgan ID bo‘yicha resume ni o‘chirish." })
    @ApiParam({ name: "id", type: "string", description: "Resume ID si" })
    @ApiResponse({ status: 200, description: "Resume muvaffaqiyatli o‘chirildi" })
    @ApiResponse({ status: 404, description: "Resume topilmadi" })
    @Delete(":id")
    async deleteResume(@Param("id") id: string): Promise<{ message: string }> {
        return this.resumeService.deleteResume(id);
    }
}
