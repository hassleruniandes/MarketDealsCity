import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/city/entity/city.entity';
import { SupermarketEntity } from 'src/supermarket/entity/supermarket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityMarketService {
  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
    @InjectRepository(SupermarketEntity)
    private supermarketRepository: Repository<SupermarketEntity>,
  ) {}

  async associateSupermarketWithCity(
    cityId: string,
    supermarketId: string,
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

  async getSupermarketsInCity(cityId: string): Promise<SupermarketEntity[]> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city.supermarkets;
  }

  async getSupermarketInCity(
    cityId: string,
    supermarketId: string,
  ): Promise<SupermarketEntity> {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
      relations: ['supermarkets'],
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    const supermarket = city.supermarkets.find((s) => s.id === supermarketId);
    if (!supermarket) {
      throw new NotFoundException('Supermarket not found in the city');
    }

    return supermarket;
  }

  async disassociateSupermarketFromCity(
    cityId: string,
    supermarketId: string,
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

    city.supermarkets = city.supermarkets.filter(
      (s) => s.id !== supermarket.id,
    );
    return this.cityRepository.save(city);
  }

  async updateSupermarketsFromCity(
    cityId: string,
    supermarketIds: string[],
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
    cityId: string,
    supermarketId: string,
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
        `Supermarket con ID ${supermarketId} no encontrado`,
      );
    }

    city.supermarkets = city.supermarkets.filter(
      (s) => s.id !== supermarketToRemove.id,
    );
    return this.cityRepository.save(city);
  }
}
