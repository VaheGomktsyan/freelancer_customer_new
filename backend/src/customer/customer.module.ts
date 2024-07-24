import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiPipeModule } from 'nestjs-joi';
import { Customer } from './entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { Work } from 'src/work/entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User, Work]), JoiPipeModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
