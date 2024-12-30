import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn('uuid') // Generates a UUID as the primary key
  id: string;

  @Column({ unique: true })
  roleName: string;

  @Column()
  description: string;
}
