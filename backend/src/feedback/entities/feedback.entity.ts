import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Work } from 'src/work/entities/work.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryColumn()
  freelancerId: number;
  @PrimaryColumn()
  workId: number;
  @Column()
  rate:number
  @Column()
  text:string

  @ManyToOne(
    (type) => Freelancer,
    (freelancer) => freelancer.freelancerFeedbacks,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'freelancerId' })
  freelancerFeedback: Freelancer;

  @OneToOne((type) => Work, (work) => work.workFeedbacks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'workId' })
  workFeedback: Work;
}
