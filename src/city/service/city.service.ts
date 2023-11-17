import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity, Country } from '../entity/city.entity';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async createCity(cityData: CreateCityDto): Promise<CityEntity> {
    if (!cityData.country || !cityData.name) {
      throw new BadRequestException('Los campos "country" y "name" son obligatorios.');
    }
    if (!Object.values(Country).includes(cityData.country)) {
      throw new BadRequestException('El país debe ser Argentina, Ecuador o Paraguay.');
    }
    const city = this.cityRepository.create(cityData);
    return this.cityRepository.save(city);
  }

  async getAllCities(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async getCityById(id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({ where: { id: id } });
    if (!city) {
      throw new BadRequestException(`Ciudad con ID ${id} no encontrado`);
    }
    return city;
  }

  async updateCity(cityId: number, cityData: UpdateCityDto): Promise<CityEntity> {
    if (cityData.country && !Object.values(Country).includes(cityData.country)) {
      throw new BadRequestException('El país debe ser Argentina, Ecuador o Paraguay');
    }
    await this.cityRepository.update(cityId, cityData);
    return this.getCityById(cityId);
  }

  async deleteCity(cityId: number): Promise<void> {
    const city = await this.cityRepository.findOne({ where: { id: cityId } });
    if (!city) {
      throw new BadRequestException(`Ciudad con ID ${cityId} no encontrado`);
    }
    await this.cityRepository.delete(cityId);
  }
}
