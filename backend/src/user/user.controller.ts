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
  Request,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ResetPassword,
  UpdatePassword,
  updatePicUrl,
  UpdateUserDto,
} from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload/config';
import { HasRoles } from 'src/auth/roles.decorator';
import { Role } from './role/user.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  // @HasRoles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @ApiBearerAuth('JWT-auth')
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.userService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.userService.findOne(+id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async remove(@Request() req, @Res() res: Response) {
    try {
      const data = await this.userService.remove(req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  // Update Data ------------------------------

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('/updateData')
  async updateData(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
    @Res() res: Response,
  ) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  // Reset Pass ------------------------------

  @HttpCode(HttpStatus.OK)
  @Patch('/resetPassword/:email')
  async resetPassword(
    @Param('email') email: string,
    @Body() reset: ResetPassword,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.resetPassword(email, reset);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  // update Pic ------------------------------

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor("file",multerOptions))
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('/updatePicUrl')
  async updatePicUrl(
    @Body() updateUserDto: updatePicUrl,
    @Request() req,
    @Res() res: Response,
    @UploadedFile() file
  ) {
    try {
      const data = await this.userService.uploadPicUrl(file, req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  // update Pass ------------------------------

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch('/updatePassword')
  async updatePassword(
    @Body() updatePassword: UpdatePassword,
    @Request() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.updatePassword(
        req.user.id,
        updatePassword,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }

  // forget Pass

  @HttpCode(HttpStatus.OK)
  @Patch('/forgetPassword/:email')
  async forgetPassword(@Param('email') email: string, @Res() res: Response) {
    try {
      const data = await this.userService.forgetPassword(email);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.OK).json({ message: e.message });
    }
  }
}
