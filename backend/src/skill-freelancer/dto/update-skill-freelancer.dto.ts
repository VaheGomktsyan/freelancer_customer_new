import { PartialType } from '@nestjs/swagger';
import { CreateSkillFreelancerDto } from './create-skill-freelancer.dto';

export class UpdateSkillFreelancerDto extends PartialType(CreateSkillFreelancerDto) {}
