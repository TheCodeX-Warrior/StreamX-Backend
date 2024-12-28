import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiManagementService } from '../../services/api-management/api-management.service';
import { ApisEndpoints } from '../../entities/api-management.entity';
import { CreateApiDto } from '../../dtos/api-management.dto';

@Controller('api-management')
export class ApiManagementController {
  constructor(private readonly _apiService: ApiManagementService) {}

  @Get(':id')
  async getApiById(@Param('id') id: string): Promise<any> {
    try {
      return await this._apiService.getApiByIdService(id);
    } catch (error: any) {
      console.error('Error in getApiById:', error);
      throw error;
    }
  }

  @Get('')
  async getAllApis(): Promise<ApisEndpoints[]> {
    try {
      return await this._apiService.getAllApisService();
    } catch (error: any) {
      console.error('Error in getAllApis:', error);
      throw error;
    }
  }

  @Post('')
  async createApi(
    @Body()
    api: CreateApiDto,
  ): Promise<ApisEndpoints> {
    try {
      return this._apiService.createApiService(api);
    } catch (error) {
      console.error('Error in createApi:', error);
      throw error;
    }
  }

  @Put(':id')
  async updateApi(
    @Param('id') id: string,
    @Body() api: Partial<CreateApiDto>,
  ): Promise<ApisEndpoints> {
    try {
      return this._apiService.updateApiService(id, api);
    } catch (error: any) {
      console.error('Error in updateApi:', error);
      throw error;
    }
  }

  @Patch(':id')
  async patchApi(@Param('id') id: string, @Body() api: Partial<CreateApiDto>) {
    try {
      return this._apiService.patchApiService(id, api);
    } catch (error: any) {
      console.error('Error in patchApi:', error);
      throw error;
    }
  }

  @Delete(':id')
  async deleteApi(@Param('id') id: string): Promise<boolean> {
    try {
      return this._apiService.deleteApiService(id);
    } catch (error) {
      console.error('Error in deleteApi:', error);
      throw error;
    }
  }
}
