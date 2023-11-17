import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { SupermarketEntity } from '../entity/supermarket.entity';
import { SupermarketService } from '../service/supermarket.service';

@Controller('supermercados')
export class SupermarketController {
  constructor(private readonly supermarketService: SupermarketService) {}

  @Get()
  findAllSupermarkets(): Promise<SupermarketEntity[]> {
    return this.supermarketService.getAllSupermarkets();
  }

  @Get(':id')
  findOneSupermarket(@Param('id') id: string): Promise<SupermarketEntity> {
    return this.supermarketService.getSupermarketById(id);
  }

  @Post()
  createSupermarket(@Body() supermarketData: Partial<SupermarketEntity>): Promise<SupermarketEntity> {
    return this.supermarketService.createSupermarket(supermarketData);
  }

  @Put(':id')
  updateSupermarket(@Param('id') supermarketId: string, @Body() supermarketData: Partial<SupermarketEntity>): Promise<SupermarketEntity> {
    return this.supermarketService.updateSupermarket(supermarketId, supermarketData);
  }

  @Delete(':id')
  deleteSupermarket(@Param('id') supermarketId: string): Promise<void> {
    return this.supermarketService.deleteSupermarket(supermarketId);
  }
}
