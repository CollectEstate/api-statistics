import { StatisticsVo } from '../valueObjects/statistics.vo';
import { LeadTypeVo } from '../valueObjects/leadType.vo';
import { MarketTypeVo } from '../valueObjects/marketType.vo';
import { ObjectTypeVo } from '../valueObjects/objectType.vo';

export interface StatisticsRepository {
  forRegion(
    leadType: LeadTypeVo,
    marketType: MarketTypeVo,
    ObjectType: ObjectTypeVo,
    area: number,
    regionId: number,
    monthsBeforeNow: number,
  ): Promise<StatisticsVo[] | null>;
}
