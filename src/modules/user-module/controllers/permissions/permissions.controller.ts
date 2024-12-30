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
import { PermissionsService } from '../../services/permissions/permissions.service';
import { Permissions } from '../../entities/permissions.entity';
import { CreatePermissionDto } from '../../dtos/permissions.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly _permissionsService: PermissionsService) {}

  @Get(':id')
  getPermissionsById(@Param('id') id: string): any {
    try {
      return this._permissionsService.getPermissionById(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('')
  getAllPermissions(): Promise<Permissions[]> {
    try {
      return this._permissionsService.getPermissions();
    } catch (error) {
      throw error;
    }
  }

  @Post('')
  createPermission(@Body() permission: CreatePermissionDto): any {
    try {
      return this._permissionsService.createPermission(permission);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  updatePermission(
    @Param('id') id: string,
    @Body() permission: Partial<CreatePermissionDto>,
  ): any {
    try {
      return this._permissionsService.updatePermission(id, permission);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/')
  patchPermission(
    @Body() permission: { id: string; name: string; description: string },
  ): any {
    return permission;
  }

  @Delete()
  deletePermission(@Param('id') id: string): any {
    try {
      return this._permissionsService.deletePermission(id);
    } catch (error) {
      throw error;
    }
  }
}
