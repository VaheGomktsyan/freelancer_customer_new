import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IsVerify } from 'src/user/dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    console.log('====>', user);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    // console.log('us=>', user);
    const payload = {
      email: user.email,
      userId: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      picUrl: user.picUrl,
    };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  async isVerify(data: IsVerify) {
    const us = await this.userRepository.findOne({
      where:{
        email: data.email,
        code: data.code,
      }
    });
    if (us) {
      await this.userRepository.update(us.id, {
        code: 0,
        isVerify: 1,
      });
      return true;
    } else {
      throw new BadRequestException('tvyalner chka');
    }
  }

  async findUserById(userId:number){
    return await this.usersService.findOne(userId)
  }

 
}
