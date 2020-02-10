import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
import { SentenceInterface } from './interfaces/labeling.interface';

@Entity()
export class Sentence implements SentenceInterface{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:500})
    sentence:string

    @Column({length:500})
    tag:string

    @Column()
    isLabeled:number

    @Column()
    isSegmented:number

    @Column()
    isEffective:number
}