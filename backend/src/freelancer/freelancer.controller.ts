import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { UpdateFreelancerDto } from './dto/update-freelancer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/role/user.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('freelancer')
@Controller('freelancer')
export class FreelancerController {
  constructor(private readonly freelancerService: FreelancerService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.freelancerService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.freelancerService.findOne(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.FREELANCER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFreelancerDto: UpdateFreelancerDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.freelancerService.update(
        +id,
        updateFreelancerDto,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
}
