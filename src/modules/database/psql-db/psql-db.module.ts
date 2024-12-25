import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user-module/entities/user-auth.entity';
import { UserProfile } from 'src/modules/user-module/entities/user-profile.entity';
import * as path from 'node:path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [
        path.join(__dirname, '../../user-module/entities/**/*.entity.{ts,js}'),
      ], // Correct glob pattern for entities
      database: 'stream-x',
      synchronize: true,
      logging: true,
    }),
  ],
})
export class PsqlDbModule {}
