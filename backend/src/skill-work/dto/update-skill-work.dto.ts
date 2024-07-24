import { PartialType } from '@nestjs/swagger';
import { CreateSkillWorkDto } from './create-skill-work.dto';

export class UpdateSkillWorkDto extends PartialType(CreateSkillWorkDto) {}
