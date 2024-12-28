import {
  BadRequestException,
  Injectable,
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
    if (!id) {
      throw new BadRequestException('API ID is required');
    }
    const api = await this._endpointRepository.findOne({ where: { id: id } });
    if (!api) {
      throw new NotFoundException(`API with ID ${id} not found`);
    }
    return api;
  }

  async getAllApisService(): Promise<ApisEndpoints[]> {
    const apis = await this._endpointRepository.find();

    if (!apis || apis.length === 0) {
      throw new NotFoundException('No APIs found');
    }
    return apis;
  }

  async createApiService(api: CreateApiDto): Promise<ApisEndpoints> {
    if (!api) {
      throw new BadRequestException('Invalid API data');
    }
    return await this._endpointRepository.save(api);
  }

  async patchApiService(
    id: string,
    api: Partial<CreateApiDto>,
  ): Promise<ApisEndpoints> {
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
  }

  async updateApiService(
    id: string,
    api: Partial<CreateApiDto>,
  ): Promise<ApisEndpoints> {
    const existingApi = await this._endpointRepository.findOne({
      where: { id: id },
    });

    if (!existingApi) {
      throw new NotFoundException(`API with ID ${id} not found`);
    }

    return await this._endpointRepository.save({ ...api, id });
  }

  async deleteApiService(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException('No ID provided for deletion');
    }
    const existingApi = await this._endpointRepository.findOne({
      where: { id: id },
    });

    if (!existingApi) {
      throw new NotFoundException(`API with ID ${id} not found`);
    }
    await this._endpointRepository.delete({ id: id });
    return true;
  }
}
