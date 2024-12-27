import { Module } from '@nestjs/common';

import { ApiManagementService } from './services/api-management/api-management.service';
import { ApiManagementController } from './controllers/api-management/api-management.controller';

@Module({
  imports: [],
  controllers: [ApiManagementController],
  providers: [ApiManagementService],
})
export class ApiManagementModule {}
