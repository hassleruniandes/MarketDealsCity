
import { SupermarketEntity } from 'src/supermarket/entity/supermarket.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Country {
  ARGENTINA = 'Argentina',
  ECUADOR = 'Ecuador',
  PARAGUAY = 'Paraguay',
}

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Country,
  })
  country: Country;

  @Column()
  population: number;

  @OneToMany(() => SupermarketEntity, (supermarket) => supermarket.cities)
  supermarkets: SupermarketEntity[];
}
