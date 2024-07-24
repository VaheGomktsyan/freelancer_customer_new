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
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/role/user.enum';
import { HasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Response } from 'express';

@ApiTags('skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() createSkillDto: CreateSkillDto, @Res() res: Response) {
    try {
      const data = await this.skillService.create(createSkillDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.skillService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.skillService.findOne(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.skillService.update(+id, updateSkillDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.skillService.remove(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
}
