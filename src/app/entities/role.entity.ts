import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

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
}
