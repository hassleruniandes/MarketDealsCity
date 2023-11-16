import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermarketEntity } from './entities/supermarket.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SupermarketEntity])],
    providers: [],
    controllers: [],
  })
export class SupermarketModule {}
