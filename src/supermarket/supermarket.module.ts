import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermarketEntity } from './entity/supermarket.entity';
import { SupermarketService } from './service/supermarket.service';

@Module({
    imports: [TypeOrmModule.forFeature([SupermarketEntity])],
    providers: [SupermarketService],
    controllers: [],
  })
export class SupermarketModule {}
