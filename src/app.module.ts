import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Sentence} from './labeling/sentence.entity'
import {TypeOrmModule} from '@nestjs/typeorm'
import { LabelingModule } from './labeling/labeling.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'labeling',
      entities:[Sentence],
      synchronize:false
    }),
    LabelingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
