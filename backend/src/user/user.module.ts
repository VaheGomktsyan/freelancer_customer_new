import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JoiPipeModule } from 'nestjs-joi';
import { Customer } from 'src/customer/entities/customer.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer, Freelancer]), JoiPipeModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
