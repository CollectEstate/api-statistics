import { ObjectTypeFilter } from '../../filters/objectType.filter';
import { LeadTypeIdFilter } from '../../filters/LeadTypeId.filter';
import { MarketTypeFilter } from '../../filters/marketType.filter';
import { StatisticsRepository } from '../../../../domain/repository/statisticsRepository';
import { Statistics } from './statistics';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SellFlatsFromPrimaryMarketStatistics
  extends Statistics
  implements StatisticsRepository
{
  protected getMarketId(): number {
    return ObjectTypeFilter.flat();
  }

  protected getObjectTypeId(): number {
    return MarketTypeFilter.primary();
  }

  protected getTypeId(): number {
    return LeadTypeIdFilter.sell();
  }
}
