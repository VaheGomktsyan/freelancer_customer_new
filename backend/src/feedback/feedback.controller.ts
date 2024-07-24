import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/role/user.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { Response } from 'express';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto, @Req() req) {
    return this.feedbackService.create(createFeedbackDto, +req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('')
  async update(
    @Body() updateFeedbackDto: UpdateFeedbackDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.feedbackService.update(
        req.user.id,
        updateFeedbackDto,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.CUSTOMER)
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
      const data = await this.feedbackService.remove(
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
