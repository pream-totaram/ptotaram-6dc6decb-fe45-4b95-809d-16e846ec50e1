import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('organization')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @ManyToOne(() => Organization,
    (organization) => organization.children,
    {
      nullable: true,
      onDelete: 'SET NULL'
    })
  parent!: Organization;

  @OneToMany(() => Organization,
    (organization) => organization.parent)
  children!: Organization[];

  @OneToMany(
    () => User,
    (user) => user.organization
  )
  users!: User[];

}
