import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApplyService } from './apply.service';
import { CreateApplyDto } from './dto/create-apply.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/role/user.enum';
import { HasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Response } from 'express';

@ApiTags('apply')
@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.FREELANCER)
  @ApiResponse({ description: 'req freelancer id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post("/sendApply")
  async sendApply(
    @Body() createApplyDto: CreateApplyDto,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
    console.log(req.user.id, createApplyDto);

      const data = await this.applyService.create(req.user.id, createApplyDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.FREELANCER)
  @ApiResponse({ description: 'req freelancer id' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @ApiBearerAuth('JWT-auth')
  @Get('/byFreelancer')
  async findByFreelancer(@Req() req, @Res() res: Response) {
    try {
      const data = await this.applyService.findOneByFreelancerId(+req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.CUSTOMER)
  @ApiResponse({ description: 'req freelancer id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('/byCustomer')
  async findByCustomer(@Req() req, @Res() res: Response) {
    try {
      const data = await this.applyService.findOneByCustomerId(+req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.CUSTOMER)
  @ApiResponse({ description: 'req freelancer id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('/byWork/:id')
  async findByWork(@Param("id") id:number, @Req() req, @Res() res: Response) {
    try {
      const data = await this.applyService.findByWork(id, +req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  //

  

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.FREELANCER)
  @ApiResponse({ description: 'req freelancer id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch(':workId')
  async update(@Param('workId') id: string, @Req() req, @Res() res: Response) {
    try {
      const data = await this.applyService.update(+id, req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.CUSTOMER, Role.FREELANCER)
  @ApiResponse({ description: 'req customer id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':workId/:freelancerId')
  async remove(
    @Param('workId') workId: string,
    @Param('freelancerId') freelancerId: string,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.applyService.remove(
        +workId,
        +freelancerId,
        req.user.id,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
}
