import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CrawledUrls {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  versions: number;

  @Column()
  invalid: boolean;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
