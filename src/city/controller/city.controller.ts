import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CityEntity } from '../entity/city.entity';
import { CityService } from '../service/city.service';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';

@Controller('ciudades')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  findAllCities(): Promise<CityEntity[]> {
    return this.cityService.getAllCities();
  }

  @Get(':id')
  findOneCity(@Param('id') id: number): Promise<CityEntity> {
    return this.cityService.getCityById(id);
  }

  @Post()
  createCity(@Body() cityData: CreateCityDto): Promise<CityEntity> {
    return this.cityService.createCity(cityData);
  }

  @Put(':id')
  updateCity(@Param('id') cityId: number, @Body() cityData: UpdateCityDto): Promise<CityEntity> {
    return this.cityService.updateCity(cityId, cityData);
  }

  @Delete(':id')
  deleteCity(@Param('id') cityId: number): Promise<void> {
    return this.cityService.deleteCity(cityId);
  }
}
