import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/user.enum';
import { JoiSchema, JoiValidationGroups } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateUserDto {
  @ApiProperty()
  @JoiSchema(Joi.string().min(2).required())
  firstName!: string;

  @ApiProperty()
  @JoiSchema(Joi.string().min(2).required())
  lastName: string;

  @ApiProperty()
  @JoiSchema(Joi.number().integer().min(18).max(120).required())
  age: number;

  @ApiProperty()
  @JoiSchema(Joi.string().email().required())
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().min(6).max(12).required())
  password: string;

  @ApiProperty()
  @JoiSchema(Joi.string().valid(Joi.ref('password')).required())
  confirmpassword: string;

  @ApiProperty()
  @JoiSchema(Joi.number().integer().min(0).max(1).required())
  role: Role;

  @ApiProperty()
  @JoiSchema(Joi.number().integer().min(1200).max(1000000))
  salary: number;

  @ApiProperty()
  @JoiSchema(Joi.string().min(2))
  description: string;
}
