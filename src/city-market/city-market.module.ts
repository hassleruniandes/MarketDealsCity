import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from 'src/city/entity/city.entity';
import { SupermarketEntity } from 'src/supermarket/entity/supermarket.entity';
import { CityMarketService } from './city-market.service';
import { CityMarketController } from './city-market.controller';
@Module({
  providers: [CityMarketService],
  imports: [TypeOrmModule.forFeature([CityEntity, SupermarketEntity])],
  controllers: [CityMarketController],
})
export class CityMarketModule {}
