import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateCityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  population: number;
}
