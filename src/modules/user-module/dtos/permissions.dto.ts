import { IsString, IsOptional, IsUUID, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @MinLength(3, { message: 'Permission must be at least 3 characters long' })
  permission: string; // Define the permission name

  @IsString()
  @MinLength(3, {
    message: 'Permission Description must be at least 3 characters long',
  })
  description: string; // Define the permission name
}

export class UpdatePermissionDto {
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string; // Update a specific permission by ID

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Permission must be at least 3 characters long' })
  permission?: string;
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'Permission Description must be at least 3 characters long',
  })
  description: string;
}

export class GetPermissionDto {
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string; // Fetch a specific permission by ID
}

export class DeletePermissionDto {
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string; // Delete a specific permission by ID
}
