import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../role/user.enum';
import { Customer } from 'src/customer/entities/customer.entity';
import mongoose from 'mongoose';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  age: number;
  @Column()
  password: string;
  @Column({ default: 0 })
  isVerify: number;
  @Column({ default: 0 })
  code: number;
  @Column({ default: 'user.png' })
  picUrl: string;
  @Column()
  role: Role;

  @OneToOne(type=>Customer, cus=>cus.userId, {
    onDelete:"CASCADE", onUpdate:"CASCADE"
  })
  customer:Customer

  @OneToOne(type=>Freelancer, cus=>cus.userId, {
    onDelete:"CASCADE", onUpdate:"CASCADE"
  })
  freelancer:Freelancer
}

export const UserSchema = SchemaFactory.createForClass(User);
