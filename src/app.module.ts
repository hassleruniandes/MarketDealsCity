import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { SupermarketModule } from './supermarket/supermarket.module';
import { CityMarketModule } from './city-market/city-market.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city/entities/city.entity';
import { SupermarketEntity } from './supermarket/entities/supermarket.entity';

@Module({
  imports: [
    CityModule,
    SupermarketModule,
    CityMarketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'marketdealscity',
      ssl: false,
      entities: [
        CityEntity,
        SupermarketEntity
      ],
      dropSchema: false,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
