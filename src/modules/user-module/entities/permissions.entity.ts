import { ApisEndpoints } from 'src/modules/api-management-module/entities/api-management.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Permissions {
  @Column()
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  permission: string;
  @Column()
  description: string;

  @OneToOne(() => ApisEndpoints)
  @JoinColumn({
    name: 'apiEndpointId',
    referencedColumnName: 'id',
  })
  apisEndpoint: ApisEndpoints;
}
