import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permissions {
  @Column()
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  permission: string;
  @Column()
  description:string
}
