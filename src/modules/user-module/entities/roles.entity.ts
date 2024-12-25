import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable, // Use JoinTable for many-to-many relationships
} from 'typeorm';
import { Permissions } from './permissions.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn('uuid') // Generates a UUID as the primary key
  id: string;

  @Column()
  roleName: string;

  @Column()
  description: string;

  @ManyToMany(() => Permissions)
  @JoinTable({
    name: 'roles_permissions_junction', // Custom junction table name
    joinColumn: {
      name: 'role_id', // Column name for the role
      referencedColumnName: 'id', // References the 'id' column in the Roles table
    },
    inverseJoinColumn: {
      name: 'permission_id', // Column name for the permission
      referencedColumnName: 'id', // References the 'id' column in the Permissions table
    },
  })
  permissions: Permissions[];
}
