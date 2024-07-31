import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { JoiPipeModule } from 'nestjs-joi';
import { User } from 'src/user/entities/user.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { SkillWork } from 'src/skill-work/entities/skill-work.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Apply } from 'src/apply/entities/apply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Work,
      User,
      Freelancer,
      Customer,
      Skill,
      SkillWork,
      Apply,
    ]),
    JoiPipeModule,
  ],
  controllers: [WorkController],
  providers: [WorkService],
  exports: [WorkService],
})
export class WorkModule {}
