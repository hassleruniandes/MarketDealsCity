
import { CityEntity } from '../../city/entity/city.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity('supermarkets')
export class SupermarketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  website: string;

  @ManyToMany(() => CityEntity, (city) => city.supermarkets)
  cities: CityEntity[];
  
}
