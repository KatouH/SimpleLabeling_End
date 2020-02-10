export interface Labeling{
    index:number;
    sentence:string;
}

export interface SentenceInterface{
    id:number,
    sentence:string,
    tag:string,
    isLabeled:number|boolean,
    isSegmented:number|boolean
    isEffective:number|boolean
}