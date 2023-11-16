import { Test, TestingModule } from '@nestjs/testing';
import { CityMarketService } from './city-market.service';

describe('CityMarketService', () => {
  let service: CityMarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityMarketService],
    }).compile();

    service = module.get<CityMarketService>(CityMarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
