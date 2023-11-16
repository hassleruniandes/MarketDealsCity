
import { CityEntity } from 'src/city/entities/city.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity('supermarket')
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
  @JoinTable({ name: 'supermarket_city' })
  cities: CityEntity[];
}
