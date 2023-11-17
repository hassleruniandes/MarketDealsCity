import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermarketEntity } from './entity/supermarket.entity';
import { SupermarketService } from './service/supermarket.service';
import { SupermarketController } from './controller/supermarket.controller';

@Module({
    imports: [TypeOrmModule.forFeature([SupermarketEntity])],
    providers: [SupermarketService],
    controllers: [SupermarketController],
  })
export class SupermarketModule {}
