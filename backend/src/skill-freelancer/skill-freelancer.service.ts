import { Injectable } from '@nestjs/common';
import { CreateSkillFreelancerDto } from './dto/create-skill-freelancer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/skill/entities/skill.entity';
import { Repository } from 'typeorm';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { SkillFreelancer } from './entities/skill-freelancer.entity';

@Injectable()
export class SkillFreelancerService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    @InjectRepository(Freelancer) private freelancerRepository: Repository<Freelancer>,
    @InjectRepository(SkillFreelancer) private skillfreelancerRepository: Repository<SkillFreelancer>
  ) { }

  async create(createSkillFreelancerDto: CreateSkillFreelancerDto) {
    const { skillId, freelancerId } = createSkillFreelancerDto
    const skill = await this.skillRepository.findOne({
      where: { id: skillId }
    })
    const freelancer = await this.freelancerRepository.findOne({
      where: { userId: freelancerId }
    })
    if (skill && freelancer) {
      return await this.skillfreelancerRepository.save({
        skillId: skill.id,
        freelancerId: freelancerId,
      })
    } else {
      return { message: 'Not found' }
    }
  }

  async remove(skillId: number, freelancerId: number) {
    const freelancer = await this.skillfreelancerRepository.findOne({
      where: {
        skillId, freelancerId
      },
    });

    if (freelancer) {
      await this.skillfreelancerRepository.delete({ skillId, freelancerId });
      return true;
    } else {
      return false;
    }
  }
}
