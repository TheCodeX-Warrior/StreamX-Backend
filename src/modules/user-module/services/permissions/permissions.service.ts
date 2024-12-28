import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiManagementService } from 'src/modules/api-management-module/services/api-management/api-management.service';
import { CreatePermissionDto } from '../../dtos/permissions.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions) // Explicitly inject the repository here
    private readonly _permissionRepository: Repository<Permissions>,
    private readonly _apiManagementService: ApiManagementService,
  ) {}

  async getPermissions(): Promise<Permissions[]> {
    return this._permissionRepository.find({
      relations: ['apisEndpoint'],
    });
  }

  async getPermissionById(id: string): Promise<Permissions> {
    if (!id) {
      throw new BadRequestException(`ID is required to fetch a permission.`);
    }
    const permission = await this._permissionRepository.findOne({
      where: { id },
      relations: ['apisEndpoint'], // Fetch related API endpoint
    });

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found.`);
    }
    return permission;
  }
  async createPermission(
    permissionDto: CreatePermissionDto,
  ): Promise<Permissions> {
    // Validate the API Endpoint
    const existingEndpoint = await this._apiManagementService.getApiByIdService(
      permissionDto.apisEndpoint,
    );

    // Check if a permission already exists for this API
    const isAlreadyPermissionExistWithApi =
      await this._permissionRepository.findOne({
        where: { apisEndpoint: existingEndpoint },
      });

    if (isAlreadyPermissionExistWithApi) {
      throw new BadRequestException(`Permission already exists for this API.`);
    }
    // Create new Permission
    const newPermission = this._permissionRepository.create({
      ...permissionDto,
      apisEndpoint: existingEndpoint,
    });

    // Save Permission
    return await this._permissionRepository.save(newPermission);
  }

  async updatePermission(
    id: string,
    updatedPermission: Partial<CreatePermissionDto>,
  ): Promise<Permissions> {
    if (!id) {
      throw new BadRequestException(`ID is required to update a permission.`);
    }
    const existingPermission = await this._permissionRepository.findOne({
      where: { id },
    });

    if (!existingPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found.`);
    }
    // Optionally handle the apisEndpoint foreign key update:
    if (updatedPermission.apisEndpoint) {
      const existingEndpoint =
        await this._apiManagementService.getApiByIdService(
          updatedPermission.apisEndpoint,
        );
      updatedPermission.apisEndpoint = existingEndpoint;
    }

    // Merge updated data into existingPermission and save
    Object.assign(existingPermission, updatedPermission);

    // Save updated Permission
    return await this._permissionRepository.save(existingPermission);
  }

  async deletePermission(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException(`ID is required to delete a permission.`);
    }
    const existingPermission = await this._permissionRepository.findOne({
      where: { id },
    });

    if (!existingPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found.`);
    }

    // Delete Permission
    await this._permissionRepository.delete(existingPermission);

    return true;
  }
}
