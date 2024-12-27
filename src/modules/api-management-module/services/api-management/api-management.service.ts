import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApisEndpoints } from '../../entities/api-management.entity';
import { Repository } from 'typeorm';
import { CreateApiDto } from '../../dtos/api-management.dto';

@Injectable()
export class ApiManagementService {
  constructor(
    @InjectRepository(ApisEndpoints)
    private readonly _endpointRepository: Repository<ApisEndpoints>,
  ) {}

  async getApiByIdService(id: string): Promise<ApisEndpoints> {
    try {
      return await this._endpointRepository.findOne({ where: { id: id } });
    } catch (error: any) {
      console.error(error, ' :getApiByIdService ');
      throw new Error(`Error getting API by ID: ${error.message}`);
    }
  }

  async getAllApisService(): Promise<ApisEndpoints[]> {
    try {
      return await this._endpointRepository.find();
    } catch (error: any) {
      console.error(error, ':getAllApisService ');
      throw new Error(`Error getting all APIs: ${error.message}`);
    }
  }

  async createApiService(api: CreateApiDto): Promise<ApisEndpoints> {
    try {
      return await this._endpointRepository.save(api);
    } catch (error: any) {
      console.error(error, ':createApiService ');
      throw new Error(`Error creating API: ${error.message}`);
    }
  }

  async patchApiService(
    id: string,
    api: Partial<CreateApiDto>,
  ): Promise<ApisEndpoints> {
    try {
      if (Object.keys(api).length <= 0) {
        throw new BadRequestException('No update data provided');
      }

      const existingApi = await this._endpointRepository.findOne({
        where: { id: id },
      });
      if (!existingApi) {
        throw new NotFoundException(`API with ID ${id} not found`);
      }
      return await this._endpointRepository.save({ ...existingApi, ...api });
    } catch (error: any) {
      console.error(error, ':updateApiService ');
      throw new InternalServerErrorException(
        `Error updating API: ${error.message}`,
      );
    }
  }
  async updateApiService(
    id: string,
    api: Partial<CreateApiDto>,
  ): Promise<ApisEndpoints> {
    try {
      const existingApi = await this._endpointRepository.findOne({
        where: { id: id },
      });
      if (!existingApi) {
        throw new NotFoundException(`API with ID ${id} not found.`);
      }
      return await this._endpointRepository.save({ ...api, id });
    } catch (error: any) {
      console.error(error, ':updateApiService');
      throw new InternalServerErrorException(
        `Error updating API: ${error.message}`,
      );
    }
  }

  async deleteApiService(id: string): Promise<void> {
    try {
      const existingApi = await this._endpointRepository.findOne({
        where: { id: id },
      });
      if (!existingApi) {
        throw new Error(`API with ID ${id} not found`);
      }
      await this._endpointRepository.delete({ id: id });
    } catch (error: any) {
      console.error(error, ':deleteApiService ');
      throw new Error(`Error deleting API: ${error.message}`);
    }
  }
}
