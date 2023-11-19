import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CityMarketService } from '../service/city-market.service';
import { SupermarketEntity } from '../../supermarket/entity/supermarket.entity';
import { CityEntity } from '../../city/entity/city.entity';

@Controller('cities/:cityId/supermarkets')
export class CityMarketController {
  constructor(private readonly cityMarketService: CityMarketService) {}

  @Post(':supermarketId')
  addSupermarketToCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number,
  ): Promise<CityEntity> {
    return this.cityMarketService.addSupermarketToCity(cityId, supermarketId);
  }

  @Get()
  findSupermarketsFromCity(@Param('cityId') cityId: number): Promise<SupermarketEntity[]> {
    return this.cityMarketService.findSupermarketsFromCity(cityId);
  }

  @Get(':supermarketId')
  findSupermarketFromCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number,
  ): Promise<SupermarketEntity> {
    return this.cityMarketService.findSupermarketFromCity(cityId, supermarketId);
  }

  @Put()
  updateSupermarketsFromCity(
    @Param('cityId') cityId: number,
    @Body() supermarketIds: number[],
  ): Promise<CityEntity> {
    return this.cityMarketService.updateSupermarketsFromCity(cityId, supermarketIds);
  }

  @Delete(':supermarketId')
  deleteSupermarketFromCity(
    @Param('cityId') cityId: number,
    @Param('supermarketId') supermarketId: number,
  ): Promise<CityEntity> {
    return this.cityMarketService.deleteSupermarketFromCity(cityId, supermarketId);
  }
}
