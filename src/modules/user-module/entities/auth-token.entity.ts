import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  deviceId: string;

  @Column()
  userId: number;

  @Column()
  generatedTimestamp: number;

  @Column()
  tokenDuration: number;
}
