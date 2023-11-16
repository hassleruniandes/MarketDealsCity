import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from 'src/city/entities/city.entity';
import { SupermarketEntity } from 'src/supermarket/entities/supermarket.entity';
@Module({
  providers: [],
  imports: [TypeOrmModule.forFeature([CityEntity, SupermarketEntity])],
})
export class CityMarketModule {}
