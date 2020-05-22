import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Role from './role.entity';
import Organization from './organization.entity';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public login: string;

  @Column()
  private password: string;

  @Column({ name: 'organization_id' })
  public organizationId?: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt?: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  public roles: Role[];

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  public organization: Organization;
}
