import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  displayName?: string;
}

export class UpdateUserSettingDto {
  @IsBoolean()
  @IsOptional()
  smsEnabled: boolean;

  @IsBoolean()
  @IsOptional()
  notification: boolean;
}
