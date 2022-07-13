import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { RealestateBuildingTypes } from './realestateBuildingTypes';
import { RealestateRegions } from './realestateRegions';
import { RealestateCities } from './realestateCities';

@Entity()
export class RealestateLeads {
  @PrimaryColumn()
  id: string;
  @Column()
  provider_id: number;

  @Column()
  crawled_url_id: string;

  @Column()
  provider_lead_url: string;

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
  building_type_id: number;

  @Column()
  building_material_id: number;

  @Column()
  windows_type_id: number;

  @Column()
  object_type_id: number;

  @Column()
  heating_id: number;

  @Column()
  construction_status_id: number;

  @Column()
  currency_id: number;

  @Column()
  ownership_id: number;

  @Column()
  lead_owner_id: number;

  @Column()
  building_year: number;

  @Column()
  rooms: number;

  @Column()
  floor: number;

  @Column()
  max_floor: number;

  @Column()
  price: number;

  @Column()
  rent: number;

  @Column()
  area: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  raw_details: string;

  @Column()
  image: string;

  @Column()
  deleted_at: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  archived_at: string;

  @Column()
  region_ids: string;

  @Column()
  prev_price: number;

  @Column()
  last_checked: string;

  @Column()
  num_of_checks: number;

  @Column()
  plot_area: number;

  @OneToOne((type) => RealestateBuildingTypes)
  @JoinColumn({ name: 'building_type_id' })
  building_type: RealestateBuildingTypes;

  @OneToOne((type) => RealestateCities)
  @JoinColumn({ name: 'city_id' })
  city: RealestateCities;

  @OneToOne((type) => RealestateRegions)
  @JoinColumn({ name: 'region_id' })
  region: RealestateRegions;
}
