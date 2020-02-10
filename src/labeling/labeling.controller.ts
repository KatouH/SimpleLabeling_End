import { Controller, Get, Query, Body,Post} from '@nestjs/common';
import { LabelingService } from './labeling.service';
import BaseController from 'src/BaseController';
import { Sentence } from './sentence.entity';


// labeling->(getOneUnlabeledSentence(),updateOneSentence(id),getSentenceById(id),)
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
        return this.labelingService.updateOneSentence(sentence);
    }
}

