import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from 'src/city/entity/city.entity';
import { SupermarketEntity } from 'src/supermarket/entity/supermarket.entity';
import { CityMarketService } from './city-market.service';
@Module({
  providers: [CityMarketService],
  imports: [TypeOrmModule.forFeature([CityEntity, SupermarketEntity])],
})
export class CityMarketModule {}
