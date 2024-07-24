import { Apply } from 'src/apply/entities/apply.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { SkillWork } from 'src/skill-work/entities/skill-work.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  deadline: Date;

  @ManyToOne((type) => Customer, (customer) => customer.works, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer: Customer;

  @OneToMany((type) => SkillWork, (work) => work.workSkill)
  works: SkillWork[];

  @OneToMany((type) => Apply, (work) => work.workApply)
  workApplys: Apply[];

  @OneToOne((type) => Feedback, (feedback) => feedback.workFeedback)
  workFeedbacks: Feedback;
}
