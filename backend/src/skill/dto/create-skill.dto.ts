import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreateSkillDto {
  @ApiProperty()
  // @JoiSchema(Joi.string().min(2).required())
  name: string;
}
