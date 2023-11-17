import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '../city/entity/city.entity';
import { SupermarketEntity } from '../supermarket/entity/supermarket.entity';
import { CityMarketService } from './service/city-market.service';
import { CityMarketController } from './controller/city-market.controller';
@Module({
  providers: [CityMarketService],
  imports: [TypeOrmModule.forFeature([CityEntity, SupermarketEntity])],
  controllers: [CityMarketController],
})
export class CityMarketModule {}
