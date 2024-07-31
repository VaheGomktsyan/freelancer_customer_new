import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Apply } from './entities/apply.entity';
import { JoiPipeModule } from 'nestjs-joi';
import { Work } from 'src/work/entities/work.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work, Freelancer, Apply, Customer]), JoiPipeModule],
  controllers: [ApplyController],
  providers: [ApplyService],
  exports: [ApplyService],
})
export class ApplyModule {}
