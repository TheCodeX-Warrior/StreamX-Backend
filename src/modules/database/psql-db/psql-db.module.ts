import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        path.join(
          __dirname,
          '../../api-management-module/entities/**/*.entity.{ts,js}',
        ),
        path.join(__dirname, '../../user-module/entities/**/*.entity.{ts,js}'),
      ],
      database: 'stream-x',
      synchronize: true,
      logging: true,
    }),
  ],
})
export class PsqlDbModule {}
