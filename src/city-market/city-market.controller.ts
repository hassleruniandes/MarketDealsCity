import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CityMarketService } from './city-market.service';
import { SupermarketEntity } from 'src/supermarket/entity/supermarket.entity';
import { CityEntity } from 'src/city/entity/city.entity';

@Controller('ciudades/:cityId/supermercados')
export class CityMarketController {
  constructor(private readonly cityMarketService: CityMarketService) {}

  @Post(':supermarketId')
  addSupermarketToCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ): Promise<CityEntity> {
    return this.cityMarketService.associateSupermarketWithCity(cityId, supermarketId);
  }

  @Get()
  findSupermarketsFromCity(@Param('cityId') cityId: string): Promise<SupermarketEntity[]> {
    return this.cityMarketService.getSupermarketsInCity(cityId);
  }

  @Get(':supermarketId')
  findSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ): Promise<SupermarketEntity> {
    return this.cityMarketService.getSupermarketInCity(cityId, supermarketId);
  }

  @Put()
  updateSupermarketsFromCity(
    @Param('cityId') cityId: string,
    @Body() supermarketIds: string[],
  ): Promise<CityEntity> {
    return this.cityMarketService.updateSupermarketsFromCity(cityId, supermarketIds);
  }

  @Delete(':supermarketId')
  deleteSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ): Promise<CityEntity> {
    return this.cityMarketService.disassociateSupermarketFromCity(cityId, supermarketId);
  }
}
