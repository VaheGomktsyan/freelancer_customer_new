import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    const { name } = createSkillDto;
    const skill = await this.skillRepository.findOne({
      where: {
        name: name,
      },
    });
    if (skill) {
      return { message: name + ' skill has already' };
    } else {
      return await this.skillRepository.save(createSkillDto);
    }
  }

  async findAll() {
    return this.skillRepository.find();
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOne({
      where: {
        id,
      },
      relations: {},
    });

    return skill || { message: 'skill not found' };
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({
      where: {
        id,
      },
    });
    if (skill) {
      await this.skillRepository.update(id, updateSkillDto);
      return true;
    } else {
      return false;
    }
  }

  async remove(id: number) {
    const skill = await this.skillRepository.findOne({
      where: {
        id,
      },
    });
    
    if (skill) {
      await this.skillRepository.delete(id);
      return true;
    } else {
      return false;
    }
  }
}
