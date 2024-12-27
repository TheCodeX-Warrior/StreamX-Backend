import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class CreateApiDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsString()
  version: string;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}
