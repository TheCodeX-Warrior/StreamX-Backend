import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity()
export class ProfileSettings {
  @PrimaryGeneratedColumn()
  id: number; // Unique ID for this settings record

  @OneToOne(() => UserProfile) // One-to-one relationship with the User entity
  @JoinColumn()
  user: UserProfile;

  // General Preferences
  @Column({ default: true })
  isProfilePublic: boolean; // Whether the user's profile is public

  @Column({ default: false })
  allowTagging: boolean; // Whether others can tag the user in posts

  @Column({ default: false })
  allowMessaging: boolean; // Whether others can send direct messages

  // Notification Preferences
  @Column({ default: true })
  emailNotifications: boolean; // Email notification preference

  @Column({ default: true })
  pushNotifications: boolean; // Push notification preference

  @Column({ default: true })
  commentNotifications: boolean; // Notify about comments on user's posts

  @Column({ default: true })
  likeNotifications: boolean; // Notify about likes on user's posts

  @Column({ default: true })
  followerNotifications: boolean; // Notify when someone follows the user

  // Privacy Settings
  @Column({ default: true })
  showLastSeen: boolean; // Whether to show the user's last seen activity

  @Column({ default: true })
  showActivityStatus: boolean; // Whether to show if the user is online

  @Column({ default: false })
  restrictSearch: boolean; // Whether the profile is searchable by username

  @Column({ default: true })
  allowStorySharing: boolean; // Whether others can share the user's stories

  // Content Preferences
  @Column({ default: true })
  safeContentFilter: boolean; // Filter sensitive content

  @Column({ default: true })
  autoplayVideos: boolean; // Whether to autoplay videos

  @Column({ default: false })
  darkModeEnabled: boolean; // User's preference for dark mode

  // Language and Region
  @Column({ default: 'en' })
  preferredLanguage: string; // Preferred language for the interface

  @Column({ default: 'US' })
  region: string; // User's region (for regional content preferences)
}
