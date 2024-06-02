import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
