import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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

  // Implement API management functionalities here
  @Get(':id')
  async getApiById(@Param('id') id: string): Promise<any> {
    try {
      const apiEndPoint = await this._apiService.getApiByIdService(id);
      if (!apiEndPoint) {
        throw new HttpException('API endpoint not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'API endpoint retrieved successfully',
        data: apiEndPoint,
      };
    } catch (error: any) {
      console.error('Error in getApiById:', error);
      // Check if the error is an instance of HttpException
      if (error instanceof HttpException) {
        throw error; // rethrow the HttpException to preserve the status code
      }
      // Handle unexpected errors
      throw new HttpException(
        `Internal Server Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('')
  async getAllApis(): Promise<string[]> {
    try {
      const apiEndPoints = await this._apiService.getAllApisService();
      return apiEndPoints.map((api) => api.name);
    } catch (error: any) {
      console.error('Error in getAllApis:', error);
      throw new HttpException(
        `Internal Server Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('')
  async createApi(
    @Body()
    api: CreateApiDto,
  ): Promise<ApisEndpoints> {
    return this._apiService.createApiService(api);
  }

  @Put(':id')
  async updateApi(
    @Param('id') id: string,
    @Body() api: Partial<CreateApiDto>,
  ): Promise<ApisEndpoints> {
    try {
      return this._apiService.updateApiService(id, api);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error; // API not found
      } else if (error instanceof BadRequestException) {
        throw error; // Validation error
      } else {
        console.error(error, ':updateApi');
        throw new InternalServerErrorException(
          'An unexpected error occurred while updating the API.',
        );
      }
    }
  }

  @Patch()
  async patchApi(@Param('id') id: string, @Body() api: Partial<CreateApiDto>) {
    try {
      return this._apiService.patchApiService(id, api);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error; // API not found
      } else if (error instanceof BadRequestException) {
        throw error; // Validation error
      } else {
        console.error(error, ':updateApi');
        throw new InternalServerErrorException(
          'An unexpected error occurred while updating the API.',
        );
      }
    }
  }

  @Delete(':id')
  async deleteApi(@Param('id') id: string): string {
    return `API with ID: ${id} deleted`;
  }
}
