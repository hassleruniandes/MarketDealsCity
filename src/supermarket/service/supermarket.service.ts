import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermarketEntity } from '../entity/supermarket.entity';
import { CreateSupermarketDto } from '../dto/create-supermarket.dto';
import { UpdateSupermarketDto } from '../dto/update-supermarket.dto';

@Injectable()
export class SupermarketService {
  constructor(
    @InjectRepository(SupermarketEntity)
    private readonly supermarketRepository: Repository<SupermarketEntity>,
  ) {}

  async createSupermarket(supermarketData: CreateSupermarketDto): Promise<SupermarketEntity> {
    if (supermarketData.name.length <= 10) {
      throw new BadRequestException('El nombre del supermercado debe tener más de 10 caracteres');
    }
    const supermarket = this.supermarketRepository.create(supermarketData);
    return this.supermarketRepository.save(supermarket);
  }

  async getAllSupermarkets(): Promise<SupermarketEntity[]> {
    return this.supermarketRepository.find();
  }

  async getSupermarketById(id: number): Promise<SupermarketEntity> {
    const supermarket = await this.supermarketRepository.findOne({ where: { id: id } });
    if (!supermarket) {
      throw new BadRequestException(`Supermarket con ID ${id} no encontrado`);
    }
    return supermarket; 
  }

  async updateSupermarket(supermarketId: number, supermarketData: UpdateSupermarketDto): Promise<SupermarketEntity> {
    if (supermarketData.name && supermarketData.name.length <= 10) {
      throw new BadRequestException('El nombre del supermercado debe tener más de 10 caracteres');
    }
    await this.supermarketRepository.update(supermarketId, supermarketData);
    return this.getSupermarketById(supermarketId);
  }

  async deleteSupermarket(supermarketId: number): Promise<void> {
    const supermarket = await this.supermarketRepository.findOne({ where: { id: supermarketId } });
    if (!supermarket) {
      throw new BadRequestException(`Supermarket con ID ${supermarketId} no encontrado`);
    }
    await this.supermarketRepository.delete(supermarketId);
  }
}
