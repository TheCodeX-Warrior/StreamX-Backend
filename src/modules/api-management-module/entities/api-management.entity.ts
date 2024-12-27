import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApisEndpoints {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  version: string;

  @Column()
  isActive: boolean;

  @Column()
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
