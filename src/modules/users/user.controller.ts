import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./models"; 
import { CreateUserDto, UpdateUserDto } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation, ApiConsumes, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: "Hamma userlarni olish", description: "Barcha mavjud userlar ro'yxatini qaytaradi." })
    @ApiResponse({ status: 200, description: "Userlar ro'yxati qaytarildi", type: [User] })
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: "Yagona userni olish", description: "Berilgan ID bo'yicha userni qaytaradi." })
    @ApiParam({ name: "id", type: "string", description: "Foydalanuvchi ID si" })
    @ApiResponse({ status: 200, description: "Topilgan user", type: User })
    @ApiResponse({ status: 404, description: "User topilmadi" })
    @Get(":id")
    async getSingleUser(@Param("id") id: string): Promise<User> {
        return this.userService.getSingleUser(id);
    }

    @ApiOperation({ summary: "User yaratish", description: "Yangi foydalanuvchi yaratish uchun" })
    @ApiConsumes("multipart/form-data")
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: "User muvaffaqiyatli yaratildi", type: User })
    @Post("add")
    @UseInterceptors(FileInterceptor("avatar"))
    async createUser(
        @Body() createUserPayload: CreateUserDto,
        @UploadedFile() avatar?: Express.Multer.File
    ): Promise<{ message: string; newUser: User }> {
        return this.userService.createUser(createUserPayload, avatar);
    }

    @ApiOperation({ summary: "User yangilash", description: "Berilgan ID ga ega user ma'lumotlarini yangilash." })
    @ApiConsumes("multipart/form-data")
    @ApiParam({ name: "id", type: "string", description: "Foydalanuvchi ID si" })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: "User muvaffaqiyatli yangilandi", type: User })
    @Put(":id")
    @UseInterceptors(FileInterceptor("avatar"))
    async updateUser(
        @Param("id") id: string,
        @Body() updateUserPayload: UpdateUserDto,
        @UploadedFile() avatar?: Express.Multer.File
    ): Promise<{ message: string; updatedUser: User }> {
        return this.userService.updateUser(id, updateUserPayload, avatar);
    }

    @ApiOperation({ summary: "Userni o‘chirish", description: "Berilgan ID bo‘yicha userni o‘chirish." })
    @ApiParam({ name: "id", type: "string", description: "Foydalanuvchi ID si" })
    @ApiResponse({ status: 200, description: "User muvaffaqiyatli o‘chirildi" })
    @ApiResponse({ status: 404, description: "User topilmadi" })
    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<{ message: string }> {
        return this.userService.deleteUser(id);
    }
}
