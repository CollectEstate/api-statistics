import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class StatisticsCrossAggregates {
  @PrimaryColumn()
  id: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  month_date: string;

  @Column()
  group_type: string;

  @Column()
  group_value: string;

  @Column()
  object_type_id: number;

  @Column()
  type_id: number;

  @Column()
  province_id: number;

  @Column()
  city_id: number;

  @Column()
  region_id: number;

  @Column()
  market_id: number;

  @Column()
  price_per_m_count: number;

  @Column()
  price_per_m_mean: number;

  @Column()
  price_per_m_std: number;

  @Column()
  price_per_m_min: number;

  @Column()
  price_per_m_5_perc: number;

  @Column()
  price_per_m_25_perc: number;

  @Column()
  price_per_m_median: number;

  @Column()
  price_per_m_75_perc: number;

  @Column()
  price_per_m_95_perc: number;

  @Column()
  price_per_m_max: number;
}
