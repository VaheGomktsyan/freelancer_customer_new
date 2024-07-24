import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import { SkillFreelancerService } from './skill-freelancer.service';
import { CreateSkillFreelancerDto } from './dto/create-skill-freelancer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/role/user.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Response } from 'express';

@ApiTags('skill-freelancer')
@Controller('skill-freelancer')
@HasRoles(Role.FREELANCER) // ------------------------------------- ??
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class SkillFreelancerController {
  constructor(
    private readonly skillFreelancerService: SkillFreelancerService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createSkillFreelancerDto: CreateSkillFreelancerDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.skillFreelancerService.create(
        createSkillFreelancerDto,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':skillId/:freelancerId')
  async remove(
    @Param('skillId') skillId: string,
    @Param('freelancerId') freelancerId: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.skillFreelancerService.remove(
        +skillId,
        +freelancerId,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
}
