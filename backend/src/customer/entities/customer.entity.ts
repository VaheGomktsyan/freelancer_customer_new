import { User } from 'src/user/entities/user.entity';
import { Work } from 'src/work/entities/work.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryColumn()
  userId: number;

  @OneToOne((type) => User, (user) => user.customer, {
    onDelete:"CASCADE", onUpdate:"CASCADE"
  })
  @JoinColumn({ name: "userId" } ) 
  user: User;

  @Column()
  description: string;


  @OneToMany(type=>Work, work=>work.customer)
  works:Work[]
}
