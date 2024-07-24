import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplyDto } from './dto/create-apply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Repository } from 'typeorm';
import { Apply } from './entities/apply.entity';
import { Work } from 'src/work/entities/work.entity';

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(Apply) private applyRepository: Repository<Apply>,
    @InjectRepository(Work) private workRepository: Repository<Work>,
    @InjectRepository(Freelancer)
    private freelancerRepository: Repository<Freelancer>,
  ) {}
  async create(createApplyDto: CreateApplyDto) {
    const { freelancerId, workId } = createApplyDto;
    const freelancer = await this.freelancerRepository.findOne({
      where: { userId: freelancerId },
    });
    const work = await this.workRepository.findOne({
      where: { id: workId },
    });
    if (freelancer && work) {
      return await this.applyRepository.save({
        freelancerId: freelancerId,
        workId: workId,
      });
    } else {
      return { message: 'Error: Not found' };
    }
  }

  async findOneByFreelancerId(userId: number) {
    const freelancer = await this.freelancerRepository.findOne({
      where: {
        userId,
      },
    });
    if (freelancer) {
      const apply = await this.applyRepository.find({
        where: {
          freelancerId: userId,
        },
        relations: {
          workApply: true,
        },
      });
      return apply;
    } else {
      throw new NotFoundException('freelancer not found');
    }
  }
  async findOneByWorkId(id: number) {
    const work = await this.workRepository.findOne({
      where: {
        id,
      },
    });
    return work || { message: 'work not found' };
  }

  async update(workId: number, freelancerId: number) {
    const apply = await this.applyRepository.findOne({
      where: {
        workId,
        freelancerId,
      },
    });
    if (!apply) throw new BadRequestException('apply not found');
    if (!apply.status) throw new BadRequestException('apply status incurect');
    if (apply.active >= 2) throw new BadRequestException('apply active>=2');

    await this.applyRepository.update(apply, {
      active: apply.active + 1,
    });
    return true;
  }

  async remove(workId: number, freelancerId: number, userId: number) {
    const apply = await this.applyRepository.findOne({
      where: {
        workId,
        freelancerId,
      },
    });
    if (apply) {
      const work = await this.workRepository.findOne({
        where: { id: workId },
        relations: { customer: true },
      });
      if (work.customer.userId == userId || userId == freelancerId) {
        await this.applyRepository.delete({ workId, freelancerId });
        return true;
      } else {
        throw new BadRequestException("forbidden action")
      }
    } else {
      return false;
    }
  }
}
