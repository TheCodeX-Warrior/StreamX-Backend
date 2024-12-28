import { Module } from '@nestjs/common';

import { ApiManagementService } from './services/api-management/api-management.service';
import { ApiManagementController } from './controllers/api-management/api-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApisEndpoints } from './entities/api-management.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApisEndpoints])], // Register the entity here
  controllers: [ApiManagementController],
  providers: [ApiManagementService],
  exports: [ApiManagementService],
})
export class ApiManagementModule {}
