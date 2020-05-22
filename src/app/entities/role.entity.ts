import { PrimaryGeneratedColumn, Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import User from './user.entity';

@Entity({ name: 'roles' })
export default class Role {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ name: 'created_at' })
  public createdAt?: Date;

  @Column({ name: 'updated_at' })
  public updatedAt?: Date;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  public users: User[];
}
