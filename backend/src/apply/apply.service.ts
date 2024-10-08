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
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(Apply) private applyRepository: Repository<Apply>,
    @InjectRepository(Work) private workRepository: Repository<Work>,
    @InjectRepository(Freelancer)
    private freelancerRepository: Repository<Freelancer>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(freelancerId: number, createApplyDto: CreateApplyDto) {
    console.log(freelancerId, createApplyDto);
    const { workId } = createApplyDto;
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
          status: 0,
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
  async findOneByCustomerId(userId: number) {
    const customer = await this.customerRepository.findOne({
      where: {
        userId,
      },
    });
    if (customer) {
      const apply = await this.applyRepository.find({
        where: {
          workApply: {
            customer,
          },
        },
        relations: {
          workApply: true,
        },
      });
      return apply;
    } else {
      throw new NotFoundException('customer not found');
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
    const freelancer = await this.freelancerRepository.findOne({
      where: {
        userId: freelancerId,
      },
    });
    const apply = await this.applyRepository.findOne({
      where: {
        workId,
        freelancerId,
        status: 0,
      },
    });
    if (apply && freelancer) {
      const work = await this.workRepository.findOne({
        where: { id: workId },
        relations: { customer: true },
      });
      if (work.customer.userId == userId || userId == freelancerId) {
        await this.applyRepository.delete({ workId, freelancerId });
      }
    }
    return true;
  }

  async acceptApp(workId: number, freelancerId: number, userId: number) {
    const freelancer = await this.freelancerRepository.findOne({
      where: {
        userId: freelancerId,
      },
    });
    const apply = await this.applyRepository.findOne({
      where: {
        workId,
        freelancerId,
        status: 0,
      },
    });
    if (apply && freelancer) {
      const work = await this.workRepository.findOne({
        where: { id: workId },
        relations: { customer: true },
      });
      if (work.customer.userId == userId || userId == freelancerId) {
        await this.applyRepository.update({status:1}, { freelancerId, workId });
      }
    }
    return true;
  }

  async findByWork(workId: number, customerId: number) {
    const work = await this.workRepository.findOne({
      where: {
        id: workId,
      },
      relations: {
        customer: true,
      },
    });
    if (work) {
      if (work.customer.userId == customerId) {
        const apply = await this.applyRepository.find({
          where: {
            workApply: work,
          },
          relations: {
            workApply: true,
            freelancerApply: {
              user: true,
            },
          },
        });
        return apply;
      } else {
        throw new BadRequestException('customer ...');
      }
    } else {
      throw new NotFoundException('work not found');
    }
  }
}
