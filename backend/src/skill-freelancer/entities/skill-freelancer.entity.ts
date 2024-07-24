import { Freelancer } from "src/freelancer/entities/freelancer.entity";
import { Skill } from "src/skill/entities/skill.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class SkillFreelancer {
    @PrimaryColumn()
    skillId: number;
  
    @ManyToOne((type) => Skill, (skill) => skill.skillsFreelancer, {
        onDelete:"CASCADE", onUpdate:"CASCADE"
      })
    @JoinColumn({ name: 'skillId' })
    skillFreelancer: Skill;
  
  
    @PrimaryColumn()
    freelancerId: number;
  
    @ManyToOne((type) => Freelancer, (freelancer) => freelancer.freelancerSkills, {
        onDelete:"CASCADE", onUpdate:"CASCADE"
      })
    @JoinColumn({ name: 'freelancerId' })
    freelancerSkill: Freelancer;
}
