import { ApiProperty, PartialType } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateUserDto {
  @ApiProperty()
  @JoiSchema(Joi.string().min(2).required())
  firstName?: string;

  @ApiProperty()
  @JoiSchema(Joi.string().min(2).required())
  lastName?: string;

  @ApiProperty()
  @JoiSchema(Joi.number().integer().min(18).max(120).required())
  age?: number;
}

export class UpdatePassword {
  @ApiProperty()
  @JoiSchema(Joi.string().min(6).max(12).required())
  oldPassword: string;

  @ApiProperty()
  @JoiSchema(Joi.string().min(6).max(12).required())
  password: string;

  @ApiProperty()
  @JoiSchema(Joi.string().valid(Joi.ref('password')).required())
  confirmPassword: string;
}

export class IsVerify {
  @ApiProperty()
  // @JoiSchema(Joi.number().integer().min(4).max(4).required())
  code: number;

  @ApiProperty()
  @JoiSchema(Joi.string().email().required())
  email: string;
}

export class Login {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @JoiSchema(Joi.string().min(6).max(12).required())
  password: string;
}

export class ResetPassword {
  @ApiProperty()
  @JoiSchema(Joi.number().min(1000).max(9999).required())
  code: number;

  @ApiProperty()
  @JoiSchema(Joi.string().min(6).max(12).required())
  password: string;

  @ApiProperty()
  @JoiSchema(Joi.string().valid(Joi.ref('password')).required())
  confirmPassword: string;
}

export class updatePicUrl {
  @ApiProperty()
  file: any;
}