import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSupermarketDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}
