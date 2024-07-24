import { Skill } from 'src/skill/entities/skill.entity';
import { Work } from 'src/work/entities/work.entity';
import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class SkillWork {
  @PrimaryColumn()
  skillId: number;

  @ManyToOne((type) => Skill, (skill) => skill.skills, {
    onDelete:"CASCADE", onUpdate:"CASCADE"
  })
  @JoinColumn({ name: 'skillId' })
  skillWork: Skill;


  @PrimaryColumn()
  workId: number;

  @ManyToOne((type) => Work, (work) => work.works, {
    onDelete:"CASCADE", onUpdate:"CASCADE"
  })
  @JoinColumn({ name: 'workId' })
  workSkill: Work;
}
