import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
@Module({
    imports: [TypeOrmModule.forFeature([CityEntity])],
    providers: [],
    controllers: [],
  })
export class CityModule {}
