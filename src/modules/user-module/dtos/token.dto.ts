import { IsEnum, IsString, IsNumber } from 'class-validator';

export enum TokenTypeEnum {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
}

export class GenerateTokenDto {
  @IsEnum(TokenTypeEnum, { message: 'Invalid token type' })
  tokenType: string;

  @IsString({ message: 'Device ID must be a string' })
  deviceId: string;

  user: any;

  @IsNumber({}, { message: 'Token duration must be a number' })
  tokenDuration: number;
}
