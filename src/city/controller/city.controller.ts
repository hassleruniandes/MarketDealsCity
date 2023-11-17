import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CityEntity } from '../entity/city.entity';
import { CityService } from '../service/city.service';

@Controller('ciudades')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  findAllCities(): Promise<CityEntity[]> {
    return this.cityService.getAllCities();
  }

  @Get(':id')
  findOneCity(@Param('id') id: string): Promise<CityEntity> {
    return this.cityService.getCityById(id);
  }

  @Post()
  createCity(@Body() cityData: Partial<CityEntity>): Promise<CityEntity> {
    return this.cityService.createCity(cityData);
  }

  @Put(':id')
  updateCity(@Param('id') cityId: string, @Body() cityData: Partial<CityEntity>): Promise<CityEntity> {
    return this.cityService.updateCity(cityId, cityData);
  }

  @Delete(':id')
  deleteCity(@Param('id') cityId: string): Promise<void> {
    return this.cityService.deleteCity(cityId);
  }
}
