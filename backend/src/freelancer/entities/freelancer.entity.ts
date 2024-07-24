import { Apply } from 'src/apply/entities/apply.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { SkillFreelancer } from 'src/skill-freelancer/entities/skill-freelancer.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Freelancer {
  @PrimaryColumn()
  userId: number;

  @Column()
  salary: number;

  @OneToOne((type) => User, (user) => user.freelancer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(
    (type) => SkillFreelancer,
    (freelancer) => freelancer.freelancerSkill,
  )
  freelancerSkills: SkillFreelancer[];

  @OneToMany((type) => Apply, (freelancer) => freelancer.freelancerApply)
  freelancerApplys: Apply[];
  
  @OneToMany((type) => Feedback, (feedback) => feedback.freelancerFeedback)
  freelancerFeedbacks: Feedback[];


}
