import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModuleModule } from './modules/chat-module/chat-module.module';
import { PsqlDbModule } from './modules/database/psql-db/psql-db.module';
import { MongoDbModule } from './modules/database/mongo-db/mongo-db.module';
import { UserModule } from './modules/user-module/user.module';
import { ApiManagementModule } from './modules/api-management-module/api-management.module';

@Module({
  imports: [
    UserModule,
    ChatModuleModule,
    PsqlDbModule,
    MongoDbModule,
    ApiManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
