import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { SupermarketEntity } from '../entity/supermarket.entity';
import { SupermarketService } from '../service/supermarket.service';
import { CreateSupermarketDto } from '../dto/create-supermarket.dto';
import { UpdateSupermarketDto } from '../dto/update-supermarket.dto';

@Controller('supermarkets')
export class SupermarketController {
  constructor(private readonly supermarketService: SupermarketService) {}

  @Get()
  findAllSupermarkets(): Promise<SupermarketEntity[]> {
    return this.supermarketService.getAllSupermarkets();
  }

  @Get(':id')
  findOneSupermarket(@Param('id') id: number): Promise<SupermarketEntity> {
    return this.supermarketService.getSupermarketById(id);
  }

  @Post()
  createSupermarket(@Body() supermarketData: CreateSupermarketDto): Promise<SupermarketEntity> {
    return this.supermarketService.createSupermarket(supermarketData);
  }

  @Put(':id')
  updateSupermarket(@Param('id') supermarketId: number, @Body() supermarketData: UpdateSupermarketDto): Promise<SupermarketEntity> {
    return this.supermarketService.updateSupermarket(supermarketId, supermarketData);
  }

  @Delete(':id')
  deleteSupermarket(@Param('id') supermarketId: number): Promise<void> {
    return this.supermarketService.deleteSupermarket(supermarketId);
  }
}
