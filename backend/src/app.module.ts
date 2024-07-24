import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomerModule } from './customer/customer.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { SkillModule } from './skill/skill.module';
import { WorkModule } from './work/work.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Skill } from './skill/entities/skill.entity';
import { Work } from './work/entities/work.entity';
import { Freelancer } from './freelancer/entities/freelancer.entity';
import { Customer } from './customer/entities/customer.entity';
import { SkillWorkModule } from './skill-work/skill-work.module';
import { SkillFreelancerModule } from './skill-freelancer/skill-freelancer.module';
import { ApplyModule } from './apply/apply.module';
import { SkillWork } from './skill-work/entities/skill-work.entity';
import { SkillFreelancer } from './skill-freelancer/entities/skill-freelancer.entity';
import { Apply } from './apply/entities/apply.entity';
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from './feedback/entities/feedback.entity';
import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User,Customer, Work, SkillWork, Skill, SkillFreelancer, Freelancer, Apply, Feedback],
      synchronize:true,
    }),
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'vahegyan56@gmail.com',
          pass: 'bhjc ddwp ipol kiuf',
        },
      },
    }),
    AuthModule,
    UserModule,
    CustomerModule,
    FreelancerModule,
    SkillModule,
    WorkModule,
    SkillWorkModule,
    SkillFreelancerModule,
    ApplyModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
