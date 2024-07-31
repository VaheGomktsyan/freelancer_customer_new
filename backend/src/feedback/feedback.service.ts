import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { Work } from 'src/work/entities/work.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Apply } from 'src/apply/entities/apply.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Work) private workRepository: Repository<Work>,
    @InjectRepository(Freelancer)
    private freelancerRepository: Repository<Freelancer>,
    @InjectRepository(Apply) private applyRepository: Repository<Apply>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto, userId: number) {
    const { workId, freelancerId, text, rate } = createFeedbackDto;
    const work = await this.workRepository.findOne({
      where: {
        id: workId,
      },
      relations: {
        customer: true,
      },
    });
    const freelancer = await this.freelancerRepository.findOne({
      where: {
        userId: freelancerId,
      },
    });

    
    if (!work) throw new BadRequestException('work not fount');
    if (work.customer.userId != userId)
      throw new BadRequestException('work customer error');
    if (!freelancer) throw new BadRequestException('freelancer not fount');
    const apply = await this.applyRepository.findOne({
      where: {
        freelancerId,
        workId,
      },
    });
    if (!apply || apply.status == 0 || apply.active < 2) {
      throw new BadRequestException('apply not fount or ...');
    }
    return await this.feedbackRepository.save({
      freelancerId: freelancerId,
      workId: workId,
      text,
      rate,
    });
  }


  async update(userId: number, updateFeedbackDto: UpdateFeedbackDto) {
    const { workId, freelancerId, ...data } = updateFeedbackDto;
    const work = await this.workRepository.findOne({
      where: {
        id: workId,
      },
      relations: {
        customer: true,
      },
    });
    const freelancer = await this.freelancerRepository.findOne({
      where: {
        userId: freelancerId,
      },
    });

    if (!work) throw new BadRequestException('work not fount');
    if (work.customer.userId != userId)
      throw new BadRequestException('work customer error');
    if (!freelancer) throw new BadRequestException('freelancer not fount');
    const feedback = await this.feedbackRepository.findOne({
      where: {
        workId,
        freelancerId,
      },
    });
    await this.feedbackRepository.update({ workId, freelancerId }, data);
  }


  // ------------------------------

  async remove(workId: number, freelancerId: number, userId: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: {
        workId,
        freelancerId,
      },
    });
    if (feedback) {
      const work = await this.workRepository.findOne({
        where: {
          id: workId,
        },
        relations: { customer: true },
      });
      if (work.customer.userId == userId || userId == freelancerId) {
        await this.feedbackRepository.delete({ workId, freelancerId });
        return true;
      } else {
        throw new BadRequestException('forbidden action');
      }
    } else {
      return false;
    }
  }
}
