import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resume } from "./models";
import { ResumeController } from "./resume.controller";
import { ResumeService } from "./resume.service";

@Module({
    imports: [TypeOrmModule.forFeature([Resume])],
    controllers: [ResumeController],
    providers: [ResumeService],
})

export class ResumeModule {}