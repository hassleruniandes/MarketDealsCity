import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { SupermarketModule } from './supermarket/supermarket.module';
import { CityMarketModule } from './city-market/city-market.module';

@Module({
  imports: [CityModule, SupermarketModule, CityMarketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
