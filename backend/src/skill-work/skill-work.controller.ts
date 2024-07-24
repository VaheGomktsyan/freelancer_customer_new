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
import { SkillWorkService } from './skill-work.service';
import { CreateSkillWorkDto } from './dto/create-skill-work.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/role/user.enum';
import { HasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Response } from 'express';

@ApiTags('skill-work')
@Controller('skill-work')
@HasRoles(Role.CUSTOMER)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class SkillWorkController {
  constructor(private readonly skillWorkService: SkillWorkService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createSkillWorkDto: CreateSkillWorkDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.skillWorkService.create(createSkillWorkDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':skillId/:workId')
  async remove(
    @Param('skillId') skillId: string,
    @Param('workId') workId: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.skillWorkService.remove(+skillId, +workId);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
}
