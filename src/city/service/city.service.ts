// city.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity, Country } from '../entity/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}


  async createCity(cityData: Partial<CityEntity>): Promise<CityEntity> {
    if (!Object.values(Country).includes(cityData.country)) {
      throw new BadRequestException('El país debe ser Argentina, Ecuador o Paraguay');
    }
    const city = this.cityRepository.create(cityData);
    return this.cityRepository.save(city);
  }

  async getAllCities(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async getCityById(id: string): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({ where: { id: id } });
    if (!city) {
      throw new NotFoundException(`Ciudad con ID ${id} no encontrado`);
    }
    return city;
  }

  async updateCity(cityId: string, cityData: Partial<CityEntity>): Promise<CityEntity> {
    if (cityData.country && !Object.values(Country).includes(cityData.country)) {
      throw new BadRequestException('El país debe ser Argentina, Ecuador o Paraguay');
    }
    await this.cityRepository.update(cityId, cityData);
    return this.getCityById(cityId);
  }

  async deleteCity(cityId: string): Promise<void> {
    await this.cityRepository.delete(cityId);
  }
}
