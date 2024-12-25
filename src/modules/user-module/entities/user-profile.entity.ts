import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'UserProfile',
})
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  profilePicture: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverPhoto: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isPrivate: boolean; // If the profile is private or public

  @Column({ type: 'boolean', default: false })
  isBlocked: boolean; // If the user is blocked

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @ManyToMany(() => UserProfile, { cascade: true })
  @JoinTable({
    name: 'user_followers',
    joinColumn: {
      name: 'user_id', // The column in the junction table referencing the current entity
      referencedColumnName: 'id', // The column in the `User` table being referenced
    },
    inverseJoinColumn: {
      name: 'follower_id', // The column in the junction table referencing the related entity
      referencedColumnName: 'id', // The column in the `UserProfile` table being referenced
    },
  })
  followers: UserProfile[];

  @ManyToMany(() => UserProfile, { cascade: true })
  @JoinTable({
    name: 'user_following',
    joinColumn: {
      name: 'user_id', // The column in the junction table referencing the current entity
      referencedColumnName: 'id', // The column in the `User` table being referenced
    },
    inverseJoinColumn: {
      name: 'following_id', // The column in the junction table referencing the related entity
      referencedColumnName: 'id', // The column in the `UserProfile` table being referenced
    },
  })
  following: UserProfile[];

  @ManyToMany(() => UserProfile, { cascade: true })
  @JoinTable({
    name: 'user_blocked',
    joinColumn: {
      name: 'user_id', // The column in the junction table referencing the current entity
      referencedColumnName: 'id', // The column in the `User` table being referenced
    },
    inverseJoinColumn: {
      name: 'blocked_id', // The column in the junction table referencing the related entity
      referencedColumnName: 'id', // The column in the `UserProfile` table being referenced
    },
  })
  blockedUsers: UserProfile[];

  @ManyToMany(() => UserProfile, { cascade: true })
  @JoinTable({
    name: 'user_friends_requests',
    joinColumn: {
      name: 'user_id', // The column in the junction table referencing the current entity
      referencedColumnName: 'id', // The column in the `User` table being referenced
    },
    inverseJoinColumn: {
      name: 'requester_id', // The column in the junction table referencing the related entity
      referencedColumnName: 'id', // The column in the `UserProfile` table being referenced
    },
  })
  friendRequests: UserProfile[];

  @ManyToMany(() => UserProfile, { cascade: true })
  @JoinTable({
    name: 'request_send_by_user',
    joinColumn: {
      name: 'requester_id', // The column in the junction table referencing the current entity
      referencedColumnName: 'id', // The column in the `User` table being referenced
    },
    inverseJoinColumn: {
      name: 'requested_id', // The column in the junction table referencing the related entity
      referencedColumnName: 'id', // The column in the `UserProfile` table being referenced
    },
  })
  requestOfUser: UserProfile[];
}
