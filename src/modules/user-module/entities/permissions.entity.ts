import { ApisEndpoints } from 'src/modules/api-management-module/entities/api-management.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => ApisEndpoints)
  @JoinTable({
    name: 'api_permissions',
    joinColumns: [{ name: 'permission_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'api_id', referencedColumnName: 'id' }],
  })
  apisEndpoints: ApisEndpoints[];
}
