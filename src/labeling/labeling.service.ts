import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sentence } from "./sentence.entity";
import { Repository } from "typeorm";
import {cut} from 'nodejieba'
import { SentenceInterface } from "./interfaces/labeling.interface";

@Injectable()
export class LabelingService{
    constructor(
        @InjectRepository(Sentence)
        private readonly SentenceRepository:Repository<Sentence>
    ){}

    async getAllSentence():Promise<SentenceInterface[]>{
        return this.SentenceRepository.find()
    }

    async getOneUnlabeledSentence():Promise<SentenceInterface>{
        let unlabeledSentence = await this.SentenceRepository.createQueryBuilder("data_list").where("data_list.isLabeled = 0").andWhere("data_list.isEffective = 1").getOne()
        if(!unlabeledSentence) return undefined
        if(unlabeledSentence.isSegmented == 0){
            unlabeledSentence.sentence = await this.jiabaSegment(unlabeledSentence.sentence);
            unlabeledSentence.isSegmented = 1;
            unlabeledSentence = await this.SentenceRepository.save(unlabeledSentence);
        }
        return unlabeledSentence;
    }

    jiabaSegment(sentence:string){
        return cut(sentence).join('||');
    }

    async getSentenceById(id:number|string):Promise<SentenceInterface>{
        let sentence = await this.SentenceRepository.createQueryBuilder("data_list").where(`data_list.id = ${id}`).getOne()
        if(!sentence) return undefined
        if(sentence.isSegmented == 0){
            sentence.sentence = await this.jiabaSegment(sentence.sentence);
            sentence.isSegmented = 1;
            sentence = await this.SentenceRepository.save(sentence)
        }
        return sentence
    }

    async updateOneSentence(newS:Sentence){
        let s = await await this.SentenceRepository.createQueryBuilder("data_list").where(`data_list.id = ${newS.id}`).getOne()
        newS.id  = s.id //newS.id string || s.id number 
        Object.assign(s,newS)
        s = await this.SentenceRepository.save(s);
        return s;

    }
}