import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCityDto {
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
