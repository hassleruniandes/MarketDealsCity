import { Test, TestingModule } from '@nestjs/testing';
import { CityMarketController } from './city-market.controller';

describe('CityMarketController', () => {
  let controller: CityMarketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityMarketController],
    }).compile();

    controller = module.get<CityMarketController>(CityMarketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
