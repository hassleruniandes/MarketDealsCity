// supermarket.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermarketEntity } from '../entity/supermarket.entity';

@Injectable()
export class SupermarketService {
  constructor(
    @InjectRepository(SupermarketEntity)
    private readonly supermarketRepository: Repository<SupermarketEntity>,
  ) {}

  async createSupermarket(supermarketData: Partial<SupermarketEntity>): Promise<SupermarketEntity> {
    if (supermarketData.name.length <= 10) {
      throw new BadRequestException('El nombre del supermercado debe tener más de 10 caracteres');
    }
    const supermarket = this.supermarketRepository.create(supermarketData);
    return this.supermarketRepository.save(supermarket);
  }

  async getAllSupermarkets(): Promise<SupermarketEntity[]> {
    return this.supermarketRepository.find();
  }

  async getSupermarketById(id: string): Promise<SupermarketEntity> {
    const supermarket = await this.supermarketRepository.findOne({ where: { id: id } });
    if (!supermarket) {
      throw new NotFoundException(`Supermarket con ID ${id} no encontrado`);
    }
    return supermarket; 
  }

  async updateSupermarket(supermarketId: string, supermarketData: Partial<SupermarketEntity>): Promise<SupermarketEntity> {
    if (supermarketData.name && supermarketData.name.length <= 10) {
      throw new BadRequestException('El nombre del supermercado debe tener más de 10 caracteres');
    }
    await this.supermarketRepository.update(supermarketId, supermarketData);
    return this.getSupermarketById(supermarketId);
  }

  async deleteSupermarket(supermarketId: string): Promise<void> {
    await this.supermarketRepository.delete(supermarketId);
  }
}
