import { Test, TestingModule } from '@nestjs/testing';
import { SupermarketService } from './supermarket.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermarketEntity } from '../entity/supermarket.entity';
import { BadRequestException } from '@nestjs/common';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';

describe('SupermarketService', () => {
  let service: SupermarketService;
  let repository: Repository<SupermarketEntity>;
  let supermarketsList: SupermarketEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SupermarketService],
    }).compile();

    service = module.get<SupermarketService>(SupermarketService);
    repository = module.get<Repository<SupermarketEntity>>(
      getRepositoryToken(SupermarketEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    supermarketsList = [];
    for (let i = 0; i < 5; i++) {
      const supermarket: SupermarketEntity = await repository.save({
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

  describe('createSupermarket', () => {
    it('should create a new supermarket', async () => {
      const newSupermarketData = {
        name: 'New Supermarket',
        longitude: 1.0,
        latitude: 1.0,
        website: 'http://new-example.com',
      };

      const result = await service.createSupermarket(newSupermarketData);

      expect(result).toBeDefined();
      expect(result.name).toBe(newSupermarketData.name);
      expect(result.longitude).toBe(newSupermarketData.longitude);
      expect(result.latitude).toBe(newSupermarketData.latitude);
      expect(result.website).toBe(newSupermarketData.website);
    });

    it('should throw BadRequestException for short name during creation', async () => {
      const shortNameData = {
        name: 'Short',
        longitude: 1.0,
        latitude: 1.0,
        website: 'http://example.com',
      };
      try {
        await service.createSupermarket(shortNameData);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('getAllSupermarkets', () => {
    it('should return a list of supermarkets', async () => {
      const result = await service.getAllSupermarkets();

      expect(result).toHaveLength(supermarketsList.length);
    });
  });

  describe('getSupermarketById', () => {
    it('should return supermarket details', async () => {
      const supermarketId = supermarketsList[0].id;
      const result = await service.getSupermarketById(supermarketId);

      expect(result).toBeDefined();
    });

    it('should throw BadRequestException when supermarket is not found', async () => {
      const nonExistentSupermarketId = 99999;

      try {
        await service.getSupermarketById(nonExistentSupermarketId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('updateSupermarket', () => {
    it('should update a supermarket', async () => {
      const supermarketToUpdate = supermarketsList[0];
      const updatedSupermarketData = {
        name: 'Updated Supermarket',
        longitude: 1.0,
        latitude: 1.0,
        website: 'http://updated-example.com',
      };

      const result = await service.updateSupermarket(
        supermarketToUpdate.id,
        updatedSupermarketData,
      );

      expect(result.name).toBe(updatedSupermarketData.name);
      expect(result.longitude).toBe(updatedSupermarketData.longitude);
      expect(result.latitude).toBe(updatedSupermarketData.latitude);
      expect(result.website).toBe(updatedSupermarketData.website);
    });

    it('should throw BadRequestException for short name during update', async () => {
      const supermarketToUpdate = supermarketsList[0];
      const updatedSupermarketData = {
        name: 'Short',
        longitude: 1.0,
        latitude: 1.0,
        website: 'http://example.com',
      };
      try {
        await service.updateSupermarket(
          supermarketToUpdate.id,
          updatedSupermarketData,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException for non-existent supermarket ID during update', async () => {
      const nonExistentSupermarketId = 999;
      const updatedSupermarketData = {
        name: 'Updated Supermarket',
        longitude: 1.0,
        latitude: 1.0,
        website: 'http://updated-example.com',
      };
      try {
        await service.updateSupermarket(
          nonExistentSupermarketId,
          updatedSupermarketData,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('deleteSupermarket', () => {
    it('should delete a supermarket', async () => {
      const supermarketToDelete = supermarketsList[0];
      await expect(
        service.deleteSupermarket(supermarketToDelete.id),
      ).resolves.toBeUndefined();
    });

    it('should throw BadRequestException for non-existent supermarket ID during delete', async () => {
      const nonExistentSupermarketId = 999;
      try {
        await service.deleteSupermarket(nonExistentSupermarketId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
