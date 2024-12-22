import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModuleModule } from './modules/user-module/user-module.module';
import { PostModuleModule } from './modules/post-module/post-module.module';
import { ChatModuleModule } from './modules/chat-module/chat-module.module';

@Module({
  imports: [UserModuleModule, PostModuleModule, ChatModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
