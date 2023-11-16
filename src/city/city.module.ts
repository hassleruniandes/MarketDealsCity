import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entity/city.entity';
import { CityService } from './service/city.service';

@Module({
    imports: [TypeOrmModule.forFeature([CityEntity])],
    providers: [CityService],
    controllers: [],
  })
export class CityModule {}
