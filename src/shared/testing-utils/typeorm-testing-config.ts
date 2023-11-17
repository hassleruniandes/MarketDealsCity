import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermarketEntity } from '../../supermarket/entity/supermarket.entity';
import { CityEntity } from '../../city/entity/city.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [CityEntity, SupermarketEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),

  TypeOrmModule.forFeature([CityEntity, SupermarketEntity]),

];
