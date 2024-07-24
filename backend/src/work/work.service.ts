import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Role } from 'src/user/role/user.enum';
import { Skill } from 'src/skill/entities/skill.entity';
import { SkillWork } from 'src/skill-work/entities/skill-work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work) private workRepository: Repository<Work>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    @InjectRepository(SkillWork)
    private skillWorkRepository: Repository<SkillWork>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createWorkDto: CreateWorkDto, userId: number) {
    const customer = await this.customerRepository.findOne({
      where: {
        userId,
      },
    });
    if (customer) {
      const { skills } = createWorkDto;
      const work = await this.workRepository.save({
        ...createWorkDto,
        customer,
      });
      for (let e of skills) {
        const skill = await this.skillRepository.findOneBy({ id: e });
        if (skill) {
          await this.skillWorkRepository.save({ skillId: e, workId: work.id });
        } else {
          return 'skill not found';
        }
      }
      return work;
    } else {
      throw new BadRequestException('Ooops ! user not found');
    }
  }

  async findAll() {
    return this.workRepository.find();
  }

  async findOne(id: number) {
    const work = await this.workRepository.findOne({
      where: {
        id,
      },
      relations: {
        workFeedbacks: true,
      },
    });
    return work || { message: 'work not found' };
  }

  async update(id: number, updateWorkDto: UpdateWorkDto) {
    const work = await this.workRepository.findOne({
      where: {
        id,
      },
    });
    if (work) {
      await this.workRepository.update(id, updateWorkDto);
      return true;
    } else {
      return false;
    }
  }

  async remove(id: number) {
    const work = await this.workRepository.findOne({
      where: {
        id,
      },
    });

    if (work) {
      await this.workRepository.delete(id);
      return true;
    } else {
      return false;
    }
  }
}
