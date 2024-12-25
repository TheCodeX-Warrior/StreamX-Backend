// create-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  password: string;
}

// update-user.dto.ts

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 50)
  username?: string;
}

// login-user.dto.ts

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  password: string;
}

// change-password.dto.ts

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  newPassword: string;
}
