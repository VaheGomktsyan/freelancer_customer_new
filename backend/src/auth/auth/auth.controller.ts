import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsVerify, Login } from 'src/user/dto/update-user.dto';
import { HasRoles } from '../roles.decorator';
import { Role } from 'src/user/role/user.enum';
import { RolesGuard } from '../roles.guard';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { LocalAuthGuard } from '../local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Request() req, @Body() us: Login) {
  //   return req.user;
  // }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch {}
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() login: Login) {
    return this.authService.login(req.user);
  }
  @Post('/isVerify')
  public isVerify(@Body() isVerify: IsVerify) {
    return this.authService.isVerify(isVerify);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('profile')
  async getProfile(@Request() req) {
    return await this.authService.findUserById(req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('getProfile')
  async profile(@Request() req) {
    return await this.authService.findUserById(req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.FREELANCER, Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('user')
  onlyFreelancer(@Request() req) {
    return req.user;
  }
}
