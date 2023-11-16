
import { SupermarketEntity } from 'src/supermarket/entities/supermarket.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  population: number;

  @OneToMany(() => SupermarketEntity, (supermarket) => supermarket.cities)
  supermarkets: SupermarketEntity[];
}
