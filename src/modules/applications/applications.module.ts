import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "./models";
import { ApplicationController } from "./applications.controller";
import { ApplicationService } from "./applications.service";

@Module({
    imports: [TypeOrmModule.forFeature([Application])],
    controllers: [ApplicationController],
    providers: [ApplicationService]
})

export class ApplicationsModule {}