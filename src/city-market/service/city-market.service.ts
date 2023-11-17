import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '../../city/entity/city.entity';
import { SupermarketEntity } from '../../supermarket/entity/supermarket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityMarketService {
  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
    @InjectRepository(SupermarketEntity)
    private supermarketRepository: Repository<SupermarketEntity>,
  ) {}

  async addSupermarketToCity(
    cityId: number,
    supermarketId: number,
  ): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city) {
      throw new NotFoundException('City not found');
    }

    const supermarket = await this.supermarketRepository.findOne({
      where: { id: supermarketId },
    });
    if (!supermarket) {
      throw new NotFoundException(
        `Supermarket con ID ${supermarketId} no encontrado`,
      );
    }

    if (city.supermarkets.some((s) => s.id === supermarket.id)) {
      throw new BadRequestException(
        'Supermarket is already associated with the city',
      );
    }

    city.supermarkets.push(supermarket);
    return this.cityRepository.save(city);
  }

  async findSupermarketsFromCity(cityId: number): Promise<SupermarketEntity[]> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city.supermarkets;
  }

  async findSupermarketFromCity(
    cityId: number,
    supermarketId: number,
  ): Promise<SupermarketEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    const supermarket = city.supermarkets.find((s) => s.id == supermarketId);
    if (!supermarket) {
      throw new NotFoundException('Supermarket not found in the city');
    }

    return supermarket;
  }

  async updateSupermarketsFromCity(
    cityId: number,
    supermarketIds: number[],
  ): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    const supermarketsToUpdate = await this.supermarketRepository
      .createQueryBuilder('supermarket')
      .where('supermarket.id IN (:...ids)', { ids: supermarketIds })
      .getMany();

    if (supermarketsToUpdate.length !== supermarketIds.length) {
      throw new NotFoundException('One or more supermarkets not found');
    }

    city.supermarkets = supermarketsToUpdate;
    return this.cityRepository.save(city);
  }

  async deleteSupermarketFromCity(
    cityId: number,
    supermarketId: number,
  ): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city) {
      throw new NotFoundException('City not found');
    }

    const supermarketToRemove = await this.supermarketRepository.findOne({
      where: { id: supermarketId },
    });
    if (!supermarketToRemove) {
      throw new NotFoundException(
        `The supermarket with the given id was not found`,
      );
    }

    city.supermarkets = city.supermarkets.filter(
      (s) => s.id !== supermarketToRemove.id,
    );
    return this.cityRepository.save(city);
  }
}
