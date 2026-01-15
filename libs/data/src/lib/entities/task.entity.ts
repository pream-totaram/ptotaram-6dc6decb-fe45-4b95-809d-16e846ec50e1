import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Status } from '../enums/status.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: Status.TO_DO, nullable: false })
  status!: Status;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE'
  })
  user!: User;
}
