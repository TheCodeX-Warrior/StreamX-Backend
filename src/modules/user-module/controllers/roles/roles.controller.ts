import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('roles')
export class RolesController {
  @Get(':id')
  getRoleById(@Param('id') id: string) {}

  @Post()
  createRole(@Body() role: { name: string; description: string }) {}

  @Post()
  asignPermissions(
    @Body() roleWithPermission: { roleId: string; permissions: string[] },
  ) {}

  @Post()
  removePermissions(
    @Body() roleWithPermission: { roleId: string; permissions: string[] },
  ) {}

  @Get()
  getAllRoles() {}

  @Get(':name')
  getRoleByName(@Param('name') name: string) {}

  @Put(':id')
  updateRole(
    @Param('id') id: string,
    @Body() role: { name?: string; description?: string },
  ) {}

  @Delete(':id')
  deleteRole(@Param('id') id: string) {}
}
