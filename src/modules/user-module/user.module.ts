import { Module } from '@nestjs/common';
import { UserAuthController } from './controllers/user-auth/user-auth.controller';
import { UserProfileController } from './controllers/user-profile/user-profile.controller';
import { UserSettingController } from './controllers/user-setting/user-setting.controller';
import { RolesController } from './controllers/roles/roles.controller';
import { PermissionsController } from './controllers/permissions/permissions.controller';
import { PermissionsService } from './services/permissions/permissions.service';
import { RolesService } from './services/roles/roles.service';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { UserSettingService } from './services/user-setting/user-setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from './entities/permissions.entity';
import { ApisEndpoints } from '../api-management-module/entities/api-management.entity';
import { ApiManagementModule } from '../api-management-module/api-management.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permissions, ApisEndpoints]),
    ApiManagementModule,
  ],
  providers: [
    PermissionsService,
    RolesService,
    UserAuthService,
    UserProfileService,
    UserSettingService,
  ],
  controllers: [
    UserAuthController,
    UserProfileController,
    UserSettingController,
    RolesController,
    PermissionsController,
  ],
})
export class UserModule {}
