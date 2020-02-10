import {SentenceInterface}  from '../interfaces/labeling.interface'

export class GetSentenceDto{
    readonly index:number;
    readonly sentence:string;
}

export class SentenceDto{
    readonly id:number;
    readonly sentence:string
    readonly tag:string
    readonly isLabeled:number
    readonly isSegmented:number
}

export class UpdateOneSentenceDto implements SentenceInterface{
    readonly id:number;
    readonly sentence:string;
    readonly tag:string;
    readonly isLabeled:number|boolean;
    readonly isSegmented:number|boolean;
    readonly isEffective:number|boolean;
}