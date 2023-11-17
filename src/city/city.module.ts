import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entity/city.entity';
import { CityService } from './service/city.service';
import { CityController } from './controller/city.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CityEntity])],
    providers: [CityService],
    controllers: [CityController],
  })
export class CityModule {}
