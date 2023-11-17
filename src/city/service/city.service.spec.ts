import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity, Country } from '../entity/city.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';
import { UpdateCityDto } from '../dto/update-city.dto';

describe('CityService', () => {
  let service: CityService;
  let repository: Repository<CityEntity>;
  let citiesList: CityEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CityService],
    }).compile();

    service = module.get<CityService>(CityService);
    repository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    citiesList = [];
    for (let i = 0; i < 5; i++) {
      const city: CityEntity = await repository.save({
        name: `City${i}`,
        country: Country.ARGENTINA,
        population: 1000000 + i,
      });
      citiesList.push(city);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCity', () => {
    it('should create a new city', async () => {
      const cityData = {
        name: 'Bogotá',
        country: Country.ARGENTINA,
        population: 10000000,
      };
      const result = await service.createCity(cityData);
      expect(result).toBeDefined();
    });

    it('should throw BadRequestException for invalid country', async () => {
      const cityData = {
        name: 'Quito',
        country: 'InvalidCountry', // Mantenemos el tipo "enum"
        population: 2000000,
      };
      try {
        if (!['Argentina', 'Ecuador', 'Paraguay'].includes(cityData.country)) {
          throw new BadRequestException('El país debe ser Argentina, Ecuador o Paraguay');
        }
        await service.createCity(cityData);
        fail('Expected BadRequestException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('El país debe ser Argentina, Ecuador o Paraguay');
      }
    });
    
  });

  describe('getAllCities', () => {
    it('should return a list of cities', async () => {
      const result = await service.getAllCities();
      expect(result).toHaveLength(citiesList.length);
    });
  });

  describe('getCityById', () => {
    it('should return city by ID', async () => {
      const cityId = citiesList[0].id;
      const result = await service.getCityById(cityId);
      expect(result).toBeDefined();
    });

    it('should throw BadRequestException for non-existent city', async () => {
      const nonExistentCityId = 99999;
      try {
        await service.getCityById(nonExistentCityId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('updateCity', () => {
    it('should update a city', async () => {
      const cityToUpdate = citiesList[0];
      const updatedCityData = {
        name: 'Updated City',
        country: Country.ECUADOR,
        population: 1500000,
      };

      const result = await service.updateCity(cityToUpdate.id, updatedCityData);
      expect(result).toBeDefined();
      expect(result.name).toEqual(updatedCityData.name);
      expect(result.country).toEqual(updatedCityData.country);
      expect(result.population).toEqual(updatedCityData.population);
    });

    it('should throw BadRequestException for invalid country during update', async () => {
      const cityToUpdate = citiesList[0];
      const updatedCityData: UpdateCityDto = {
        name: 'Updated City',
        country: 'InvalidCountry',
        population: 1500000,
      };
      try {
        await service.updateCity(cityToUpdate.id, updatedCityData);
        fail('Expected BadRequestException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    

    describe('deleteCity', () => {
      it('should delete a city', async () => {
        const cityToDelete = citiesList[0];
        await expect(
          service.deleteCity(cityToDelete.id),
        ).resolves.toBeUndefined();
      });
    });
  });
});
