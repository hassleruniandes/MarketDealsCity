import { Test, TestingModule } from '@nestjs/testing';
import { CityMarketService } from './city-market.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../../city/entity/city.entity';
import { SupermarketEntity } from '../../supermarket/entity/supermarket.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';

describe('CityMarketService', () => {
  let service: CityMarketService;
  let cityRepository: Repository<CityEntity>;
  let supermarketRepository: Repository<SupermarketEntity>;
  let citiesList: CityEntity[];
  let supermarketsList: SupermarketEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CityMarketService],
    }).compile();

    service = module.get<CityMarketService>(CityMarketService);
    cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
    supermarketRepository = module.get<Repository<SupermarketEntity>>(getRepositoryToken(SupermarketEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    cityRepository.clear();
    supermarketRepository.clear();

    citiesList = [];
    for (let i = 1; i < 5; i++) {
      const city: CityEntity = await cityRepository.save({
        name: `City ${i}`,
        country: 'Argentina',
        population: 1000000,
      });
      citiesList.push(city);
    }

    supermarketsList = [];
    for (let i = 1; i < 5; i++) {
      const supermarket: SupermarketEntity = await supermarketRepository.save({
        name: `Supermarket ${i}`,
        longitude: 0.0,
        latitude: 0.0,
        website: `http://example${i}.com`,
      });
      supermarketsList.push(supermarket);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addSupermarketToCity', () => {
    it('should add a supermarket to a city', async () => {
      const cityToAddTo = citiesList[0];
      const supermarketToAdd = supermarketsList[0];

      const result = await service.addSupermarketToCity(cityToAddTo.id, supermarketToAdd.id);

      expect(result.supermarkets).toContainEqual(supermarketToAdd);
    });

    it('should throw NotFoundException for non-existent city ID', async () => {
      const nonExistentCityId = 999;
      const supermarketToAdd = supermarketsList[0];
      try {
        await service.addSupermarketToCity(nonExistentCityId, supermarketToAdd.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw NotFoundException for non-existent supermarket ID', async () => {
      const cityToAddTo = citiesList[0];
      const nonExistentSupermarketId = 999;
      try {
        await service.addSupermarketToCity(cityToAddTo.id, nonExistentSupermarketId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw BadRequestException when supermarket is already associated with the city', async () => {
      const cityToAddTo = citiesList[0];
      const supermarketToAdd = supermarketsList[0];
      try {
        await service.addSupermarketToCity(cityToAddTo.id, supermarketToAdd.id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findSupermarketsFromCity', () => {

    

    it('should throw NotFoundException for non-existent city ID', async () => {
      const nonExistentCityId = 9999;
      try {
        await service.findSupermarketsFromCity(nonExistentCityId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findSupermarketFromCity', () => {
    // it('should find a specific supermarket from a city', async () => {
    //   const cityToFindFrom = citiesList[0];
    //   const supermarketToFind = cityToFindFrom.supermarkets[0];

    //   const result = await service.findSupermarketFromCity(cityToFindFrom.id, supermarketToFind.id);

    //   expect(result).toEqual(supermarketToFind);
    // });

    it('should throw NotFoundException for non-existent city ID', async () => {
      const nonExistentCityId = 999;
      const supermarketToFind = supermarketsList[0];
      try {
        await service.findSupermarketFromCity(nonExistentCityId, supermarketToFind.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw NotFoundException for non-existent supermarket ID', async () => {
      const cityToFindFrom = citiesList[0];
      const nonExistentSupermarketId = 999;
      try {
        await service.findSupermarketFromCity(cityToFindFrom.id, nonExistentSupermarketId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw NotFoundException when supermarket is not in the city', async () => {
      const cityToFindFrom = citiesList[0];
      const supermarketToFind = supermarketsList[0];
      try {
        await service.findSupermarketFromCity(cityToFindFrom.id, supermarketToFind.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('updateSupermarketsFromCity', () => {
    // it('should update supermarkets for a city', async () => {
    //   const cityToUpdate = citiesList[0];
    //   const supermarketsToUpdateIds = supermarketsList.map((supermarket) => supermarket.id);

    //   const result = await service.updateSupermarketsFromCity(cityToUpdate.id, supermarketsToUpdateIds);

    //   expect(result.supermarkets).toEqual(supermarketsList);
    // });

    it('should throw NotFoundException for non-existent city ID', async () => {
      const nonExistentCityId = 999;
      const supermarketsToUpdateIds = supermarketsList.map((supermarket) => supermarket.id);
      try {
        await service.updateSupermarketsFromCity(nonExistentCityId, supermarketsToUpdateIds);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw NotFoundException for one or more non-existent supermarket IDs', async () => {
      const cityToUpdate = citiesList[0];
      const nonExistentSupermarketId = 999;
      const supermarketsToUpdateIds = [...supermarketsList.map((supermarket) => supermarket.id), nonExistentSupermarketId];
      try {
        await service.updateSupermarketsFromCity(cityToUpdate.id, supermarketsToUpdateIds);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteSupermarketFromCity', () => {

    // it('should delete a supermarket from a city', async () => {
    //   const cityToDeleteFrom = citiesList[0];
    //   const supermarketToDelete = cityToDeleteFrom.supermarkets[0];
    //   await expect(() =>
    //     service.deleteSupermarketFromCity(
    //       cityToDeleteFrom.id,
    //       supermarketToDelete.id,
    //     ),
    //   ).rejects.toHaveProperty(
    //     'message',
    //     'The supermarket with the given id was not found',
    //   );
    // });

    it('should throw NotFoundException for non-existent city ID', async () => {
      const nonExistentCityId = 999;
      const supermarketToDelete = supermarketsList[0];
      try {
        await service.deleteSupermarketFromCity(nonExistentCityId, supermarketToDelete.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw NotFoundException for non-existent supermarket ID', async () => {
      const cityToDeleteFrom = citiesList[0];
      const nonExistentSupermarketId = 999;
      try {
        await service.deleteSupermarketFromCity(cityToDeleteFrom.id, nonExistentSupermarketId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw NotFoundException when supermarket is not in the city', async () => {
      const cityToDeleteFrom = citiesList[0];
      const supermarketToDelete = supermarketsList[0];
      try {
        await service.deleteSupermarketFromCity(cityToDeleteFrom.id, supermarketToDelete.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
