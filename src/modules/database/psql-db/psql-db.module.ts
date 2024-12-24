import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user-module/entities/user-auth.entity';
import { UserProfile } from 'src/modules/user-module/entities/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User, UserProfile],
      database: 'stream-x',
      synchronize: true,
      logging: true,
    }),
  ],
})
export class PsqlDbModule {}
