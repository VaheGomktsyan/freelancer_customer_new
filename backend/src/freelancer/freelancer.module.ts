import { Module } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { FreelancerController } from './freelancer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelancer } from './entities/freelancer.entity';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [TypeOrmModule.forFeature([Freelancer]), JoiPipeModule],
  controllers: [FreelancerController],
  providers: [FreelancerService],
  exports: [FreelancerService],
})
export class FreelancerModule {}
