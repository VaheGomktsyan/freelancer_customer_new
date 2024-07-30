import { Injectable } from '@nestjs/common';
import { UpdateFreelancerDto } from './dto/update-freelancer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from './entities/freelancer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectRepository(Freelancer)
    private freelancerRepository: Repository<Freelancer>,
  ) {}

  async findAll() {
    return await this.freelancerRepository.find({
      relations:{
        user:true
      },
      select:{
        userId:true,
        salary:true,
        user:{
          lastName:true,
          firstName:true,
          email:true,
        }
      }
    });
  }

  async findOne(userId: number) {
    const freelancer = await this.freelancerRepository.findOne({
      where: {
        userId,
      },
    });
    return freelancer || { message: 'freelancer not found' };
  }

  // ?? -----------
  async update(userId: number, updateFreelancerDto: UpdateFreelancerDto) {
    const freelancer = await this.freelancerRepository.findOne({
      where: {
        userId,
      },
    });
    if (freelancer) {
      await this.freelancerRepository.update(userId, updateFreelancerDto);
      return true;
    } else {
      return false;
    }
  }
}
