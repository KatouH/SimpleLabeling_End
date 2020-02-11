import { Controller, Get, Query, Body,Post} from '@nestjs/common';
import { LabelingService } from './labeling.service';
import BaseController from 'src/BaseController';
import { Sentence } from './sentence.entity';

@Controller('labeling')
export class LabelingController extends BaseController{
    constructor(private readonly labelingService:LabelingService){
        super();
    }
    @Get('getall')
    async getAllSentence(){
        return this.labelingService.getAllSentence();
    }


    @Get('getone')
    async getOneUnlabeledSentence(){
        const res = await this.labelingService.getOneUnlabeledSentence();
        if(res)return await this.send(undefined,res);
        else return await this.error(1,"There is no more data",[])
    }

    @Get('getbyid')
    async getSentenceById(@Query("id") id:string){
        const res = await this.labelingService.getSentenceById(id);
        if(res)return await this.send(undefined,res);
        else return await this.error(1,"There is no more data",[])
    }

    @Post('updateone')
    async updateOneSentence(@Body() sentence:Sentence){
        if(!sentence)return await this.error(2,"Wrong Param",[]);
        const res = await this.labelingService.updateOneSentence(sentence);
        if(res)return this.send("success update",[])
        else return this.error(3,"failed to update,try other time",[])
    }
}

