import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RealestateBuildingTypes {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  active: boolean;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
