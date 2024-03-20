import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  year: number;
  
  @Column()
  mileage: number;
}
