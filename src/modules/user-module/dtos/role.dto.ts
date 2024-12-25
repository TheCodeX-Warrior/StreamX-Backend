import { IsString, IsUUID, IsOptional, MinLength } from 'class-validator';

export class CreateRolesDto {
  @IsString()
  @MinLength(3, { message: 'Role name must be at least 3 characters long' })
  roleName: string;

  @IsString()
  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  description: string;
}

export class UpdateRolesDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Role name must be at least 3 characters long' })
  roleName?: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  description?: string;
}

export class GetRolesDto {
  @IsOptional()
  @IsString()
  roleName?: string; // Optional filter for role name
}

export class GetRoleDto {
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string; // Fetch a specific role by ID
}

export class DeleteRoleDto {
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string; // Delete a specific role by ID
}

export class AssignPermissionToRolesDto {
  @IsUUID('4', { message: 'Invalid UUID format for role ID' })
  roleId: string;

  @IsUUID('4', { each: true, message: 'Invalid UUID format for permission IDs' })
  permissionIds: string[]; // Array of permission IDs to be assigned to the role
}
