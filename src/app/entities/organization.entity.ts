import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity({ name: 'organizations' })
export default class Organization {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ name: 'created_at' })
  public createdAt?: Date;

  @Column({ name: 'updated_at' })
  public updatedAt?: Date;
}
