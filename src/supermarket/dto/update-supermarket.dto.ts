import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateSupermarketDto {
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
