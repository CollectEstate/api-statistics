import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RealestateRegions {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  active: boolean;

  @Column()
  lat_lon: string;

  @Column()
  city_id: number;

  @Column()
  parent_id: number;

  @Column()
  for_stats: number;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
