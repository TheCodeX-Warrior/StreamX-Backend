import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('permissions')
export class PermissionsController {
  @Get(':id')
  getPermissionsById(@Param('id') id: string): any {
    return { id: id, permissions: ['read', 'write', 'delete'] };
  }

  @Get('')
  getAllPermissions(): any[] {
    return null;
  }

  @Post('/')
  createPermission(
    @Body() permission: { name: string; description: string },
  ): any {
    return permission;
  }

  @Put('/')
  updatePermission(
    @Body() permission: { id: string; name: string; description: string },
  ): any {
    return permission;
  }

  @Patch('/')
  patchPermission(
    @Body() permission: { id: string; name: string; description: string },
  ): any {
    return permission;
  }
}
