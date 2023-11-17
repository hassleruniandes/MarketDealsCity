import { SupermarketEntity } from '../../supermarket/entity/supermarket.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

export const Country = {
  ARGENTINA: 'Argentina',
  ECUADOR: 'Ecuador',
  PARAGUAY: 'Paraguay',
};

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  population: number;

  @ManyToMany(() => SupermarketEntity, supermercado => supermercado.cities)
  @JoinTable({ name: 'city_supermarket' })
  supermarkets: SupermarketEntity[];
}
