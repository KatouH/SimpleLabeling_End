import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sentence } from "./sentence.entity";
import { LabelingService } from "./labeling.service";
import { LabelingController } from "./labeling.controller";


@Module({
    imports:[TypeOrmModule.forFeature([Sentence])],
    providers:[LabelingService],
    controllers:[LabelingController]
})

export class LabelingModule{}