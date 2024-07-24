import { Module } from '@nestjs/common';
import { SkillFreelancerService } from './skill-freelancer.service';
import { SkillFreelancerController } from './skill-freelancer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from 'src/skill/entities/skill.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { SkillFreelancer } from './entities/skill-freelancer.entity';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill, Freelancer, SkillFreelancer]),
    JoiPipeModule,
  ],
  controllers: [SkillFreelancerController],
  providers: [SkillFreelancerService],
  exports: [SkillFreelancerService],
})
export class SkillFreelancerModule {}
