import { Module } from '@nestjs/common';
import { SkillWorkService } from './skill-work.service';
import { SkillWorkController } from './skill-work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from 'src/skill/entities/skill.entity';
import { Work } from 'src/work/entities/work.entity';
import { SkillWork } from './entities/skill-work.entity';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, Work, SkillWork]),JoiPipeModule],
  controllers: [SkillWorkController],
  providers: [SkillWorkService],
  exports: [SkillWorkService],
})
export class SkillWorkModule {}
