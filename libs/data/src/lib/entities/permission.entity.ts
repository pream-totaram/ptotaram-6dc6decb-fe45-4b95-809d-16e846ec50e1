import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string; // e.g., 'users.create', 'posts.delete'

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
