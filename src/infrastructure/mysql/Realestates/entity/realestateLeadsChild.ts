import { Column, Entity } from 'typeorm';
import { RealestateLeads } from './realestateLeads';

@Entity()
export class RealestateLeadsChild extends RealestateLeads {
  @Column()
  parent_id: string;
}
