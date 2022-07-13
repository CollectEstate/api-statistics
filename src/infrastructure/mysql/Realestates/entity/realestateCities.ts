import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RealestateCities {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  active: boolean;

  @Column()
  status: boolean;

  @Column()
  radius: number;

  @Column()
  lat_lon: string;

  @Column()
  province_id: number;

  @Column()
  population: number;

  @Column()
  is_main: boolean;

  @Column()
  subprovince_id: number;

  @Column()
  for_stats: number;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
