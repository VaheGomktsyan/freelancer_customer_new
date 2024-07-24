import { SkillFreelancer } from 'src/skill-freelancer/entities/skill-freelancer.entity';
import { SkillWork } from 'src/skill-work/entities/skill-work.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => SkillWork, (work) => work.skillWork)
  skills: SkillWork[];

  @OneToMany((type) => SkillFreelancer, (freelancer) => freelancer.skillFreelancer)
  skillsFreelancer: SkillFreelancer[];
}
