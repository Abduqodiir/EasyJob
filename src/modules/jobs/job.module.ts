import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./models";
import { JobController } from "./job.controller";
import { JobService } from "./job.service";

@Module({
    imports: [TypeOrmModule.forFeature([Job])],
    controllers: [JobController],
    providers: [JobService]
})

export class JobModule {}