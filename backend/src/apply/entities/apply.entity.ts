import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Work } from 'src/work/entities/work.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ActiveEnum, StatusEnum } from './enum';

@Entity()
export class Apply {
  @PrimaryColumn()
  freelancerId: number;

  @PrimaryColumn()
  workId: number;

  @ManyToOne((type) => Freelancer, (freelancer) => freelancer.freelancerApplys, {
    onDelete:"CASCADE", onUpdate:"CASCADE"
  })
  @JoinColumn({ name: 'freelancerId' })
  freelancerApply: Freelancer;

  @ManyToOne((type) => Work, (work) => work.workApplys, {
    onDelete:"CASCADE", onUpdate:"CASCADE"
  })
  @JoinColumn({ name: 'workId' })
  workApply: Work;

  @Column({default:StatusEnum.PENDING})
  status:StatusEnum;

  @Column({default:ActiveEnum.START})
  active:ActiveEnum;
}
