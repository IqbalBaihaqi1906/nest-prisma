import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class CreateGroupPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  description: string;

  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  @IsArray()
  @ArrayNotEmpty()
  userIds: number[];
}
