import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ResetPassword,
  UpdatePassword,
  UpdateUserDto,
} from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './role/user.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { Customer } from 'src/customer/entities/customer.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Freelancer)
    private freelancerRepository: Repository<Freelancer>,
    private mailerRepository: MailerService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const {
      email,
      password,
      confirmpassword,
      role,
      salary,
      description,
      ...us
    } = createUserDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException(`Ooops ! ${email} has already`);
    }

    if (!(role == Role.CUSTOMER || role == Role.FREELANCER)) {
      throw new BadRequestException('Ooops ! invalid User Role');
    }
    const code = crypto.randomInt(1000, 9999);
    const person = await this.userRepository.save({
      ...us,
      email,
      role,
      password: bcrypt.hashSync(password, 10),
    });

    if (Role.CUSTOMER == role) {
      const customer = await this.customerRepository.save({
        userId: person.id,
        description,
      });
    } else if (role == Role.FREELANCER) {
      const freelancer = await this.freelancerRepository.save({
        userId: person.id,
        salary,
      });
    }

    await this.mailerRepository.sendMail({
      to: 'vahegyan56@gmail.com',
      from: 'vahegyan56@gmail.com',
      subject: 'Register',
      html: `<h1>Hi dear ${us.firstName}</h1>
      <p>for verify code</p>
      <b>${code}</b>
      `,
    });

    return person;
  }

  async findAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.firstName',
        'user.lastName',
        'user.role',
        'user.email',
        'user.picUrl',
      ])
      .getMany();
  }

  async findOne(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id })
      .select([
        'user.firstName',
        'user.lastName',
        'user.role',
        'user.email',
        'user.picUrl',
      ])
      .getOne();
    if (user) {
      return user;
    } else {
      throw new BadRequestException(`Ooops ! user not found`);
    }
  }

  async findOneByEmail(email: string) {
    const usemail = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email=:email', { email })
      .getOne();
    if (usemail) {
      return usemail;
    } else {
      throw new BadRequestException(`Ooops ! User's Email not found`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      await this.userRepository.update(id, updateUserDto);
      return true;
    } else {
      return false;
    }
  }

  async uploadPicUrl(file: any, userId: number) {
    const data = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (data) {
      if (file.filename) {
        await this.userRepository.update(userId, {
          picUrl: file.filename,
        });
        return true;
      } else {
        throw new BadRequestException('File is not uploaded');
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      await this.userRepository.delete(id);
      return true;
    } else {
      return false;
    }
  }

  async updatePassword(id: number, updatePassword: UpdatePassword) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      if (bcrypt.compareSync(updatePassword.oldPassword, user.password)) {
        if (updatePassword.password == updatePassword.confirmPassword) {
          const data = await this.userRepository.update(user.id, {
            password: bcrypt.hashSync(updatePassword.password, 10),
          });
          return data;
        } else {
          throw new BadRequestException('confirm password invalid');
        }
      } else {
        throw new BadRequestException('old password invalid');
      }
    } else {
      throw new BadRequestException('user not found');
    }
  }

  async forgetPassword(email: string) {
    const us = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (us) {
      const code = crypto.randomInt(1000, 9999);
      await this.mailerRepository.sendMail({
        to: 'vahegyan56@gmail.com',
        from: 'vahegyan56@gmail.com',
        subject: 'Register',
        html: `<h1>Hi dear ${us.firstName}</h1>
           <p>for verify code</p>
             <b>${code}</b>
    `,
      });
      await this.userRepository.update(us.id, { code });
      return true;
    } else {
      throw new BadRequestException('user not found');
    }
  }

  async resetPassword(email: string, resetPassword: ResetPassword) {
    const us = await this.userRepository.findOne({
      where: { email, code: resetPassword.code },
    });
    if (us) {
      if (resetPassword.password == resetPassword.confirmPassword) {
        const data = await this.userRepository.update(us.id, {
          password: bcrypt.hashSync(resetPassword.password, 10),
          code: null,
        });
        return 'scuccess';
      } else {
        throw new BadRequestException('confirm password invalid');
      }
    } else {
      throw new BadRequestException('user not found');
    }
  }
}
