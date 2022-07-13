import { RegionVo } from './region.vo';
import { CityVo } from './city.vo';
import { LeadTypeVo } from './leadType.vo';
import { ObjectTypeVo } from './objectType.vo';
import { MarketTypeVo } from './marketType.vo';

export class LeadDataVo {
  id: string;
  url: string;
  area: number;
  price: number;
  pricePerM: number;
  floor: number | null;
  maxFloor: number | null;
  rooms: number | null;
  buildingTypeName: string | null;
  buildingYear: number | null;
  image: string | null;
  region: RegionVo | null;
  city: CityVo | null;
  type: LeadTypeVo | null;
  objectType: ObjectTypeVo | null;
  marketType: MarketTypeVo | null;
}
