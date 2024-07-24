import { Injectable } from '@nestjs/common';
import { CreateSkillWorkDto } from './dto/create-skill-work.dto';
import { UpdateSkillWorkDto } from './dto/update-skill-work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/skill/entities/skill.entity';
import { Repository } from 'typeorm';
import { Work } from 'src/work/entities/work.entity';
import { SkillWork } from './entities/skill-work.entity';

@Injectable()
export class SkillWorkService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    @InjectRepository(Work) private workRepository: Repository<Work>,
    @InjectRepository(SkillWork)
    private skillWorkRepository: Repository<SkillWork>,
  ) {}

  async create(createSkillWorkDto: CreateSkillWorkDto) {
    const { skillId, workId } = createSkillWorkDto;
    const skill = await this.skillRepository.findOne({
      where: { id: skillId },
    });
    const work = await this.workRepository.findOne({
      where: { id: workId },
    });
    if (skill && work) {
      return await this.skillWorkRepository.save({
        skillWork: skill,
        workSkill: work,
      });
    } else {
      return { message: 'Not found' };
    }
  }

  async remove(skillId: number, workId:number) {
    const work = await this.skillWorkRepository.findOne({
      where: {
        skillId, workId
      },
    });

    if (work) {
      await this.skillWorkRepository.delete({skillId, workId});
      return true;
    } else {
      return false;
    }
  }
}
