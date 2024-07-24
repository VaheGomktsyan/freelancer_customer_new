import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { JoiPipeModule } from 'nestjs-joi';
import { Work } from 'src/work/entities/work.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Apply } from 'src/apply/entities/apply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback, Work, Freelancer, Apply]),
    JoiPipeModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
