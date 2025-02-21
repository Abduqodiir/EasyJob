import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ApplicationService } from "./applications.service"; 
import { Application } from "./models"; 
import { CreateApplicationDto, UpdateApplicationDto } from "./dtos";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";

@ApiTags("Applications")
@Controller("applications")
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @ApiOperation({ summary: "Hamma applicationlarni olish", description: "Barcha mavjud applicationlarni qaytaradi." })
    @ApiResponse({ status: 200, description: "Applicationlar ro'yxati qaytarildi", type: [Application] })
    @Get()
    async getAllApplications(): Promise<Application[]> {
        return this.applicationService.getAllApplications();
    }

    @ApiOperation({ summary: "Yagona applicationni olish", description: "Berilgan ID bo'yicha applicationni qaytaradi." })
    @ApiParam({ name: "id", type: "string", description: "Application ID si" })
    @ApiResponse({ status: 200, description: "Topilgan application", type: Application })
    @ApiResponse({ status: 404, description: "Application topilmadi" })
    @Get(":id")
    async getSingleApplication(@Param("id") id: string): Promise<Application> {
        return this.applicationService.getSingleApplication(id);
    }

    @ApiOperation({ summary: "Application yaratish", description: "Yangi application yaratish uchun" })
    @ApiBody({ type: CreateApplicationDto })
    @ApiResponse({ status: 201, description: "Application muvaffaqiyatli yaratildi", type: Application })
    @Post("add")
    async createApplication(
        @Body() createApplicationPayload: CreateApplicationDto
    ): Promise<{ message: string; newApplication: Application }> {
        return this.applicationService.createApplication(createApplicationPayload);
    }

    @ApiOperation({ summary: "Application yangilash", description: "Berilgan ID ga ega application ma'lumotlarini yangilash." })
    @ApiParam({ name: "id", type: "string", description: "Application ID si" })
    @ApiBody({ type: UpdateApplicationDto })
    @ApiResponse({ status: 200, description: "Application muvaffaqiyatli yangilandi", type: Application })
    @Put(":id")
    async updateApplication(
        @Param("id") id: string,
        @Body() updateApplicationPayload: UpdateApplicationDto
    ): Promise<{ message: string; updatedApplication: Application }> {
        return this.applicationService.updateApplication(id, updateApplicationPayload);
    }

    @ApiOperation({ summary: "Applicationni o‘chirish", description: "Berilgan ID bo‘yicha applicationni o‘chirish." })
    @ApiParam({ name: "id", type: "string", description: "Application ID si" })
    @ApiResponse({ status: 200, description: "Application muvaffaqiyatli o‘chirildi" })
    @ApiResponse({ status: 404, description: "Application topilmadi" })
    @Delete(":id")
    async deleteApplication(@Param("id") id: string): Promise<{ message: string }> {
        return this.applicationService.deleteApplication(id);
    }
}
