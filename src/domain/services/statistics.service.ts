import { LeadTypeVo } from '../valueObjects/leadType.vo';
import { ObjectTypeVo } from '../valueObjects/objectType.vo';
import { MarketTypeVo } from '../valueObjects/marketType.vo';
import { RegionVo } from '../valueObjects/region.vo';
import { StatisticsRepository } from '../repository/statisticsRepository';
import { StatisticsVo } from '../valueObjects/statistics.vo';
import { Inject, Injectable } from '@nestjs/common';
import { SellFlatsFromPrimaryMarketStatistics } from '../../infrastructure/mysql/statistics/repository/sellFlatsFromPrimaryMarket.statistics';
import { SellFlatsFromAfterMarketStatistics } from '../../infrastructure/mysql/statistics/repository/sellFlatsFromAfterMarket.statistics';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(SellFlatsFromPrimaryMarketStatistics)
    private sellFlatsPrimaryMarketRepository: StatisticsRepository,
    @Inject(SellFlatsFromAfterMarketStatistics)
    private sellFlatsAfterMarketRepository: StatisticsRepository,
  ) {}

  async lastMonthForRegion(
    leadType: LeadTypeVo,
    objectType: ObjectTypeVo,
    marketType: MarketTypeVo,
    area: number,
    region: RegionVo,
  ): Promise<StatisticsVo[] | null> {
    if (leadType.isSell() && marketType.isPrimary() && objectType.isFlat()) {
      return this.sellFlatsPrimaryMarketRepository.byAreaAndRegionForLastMonth(
        area,
        region.parentId ? region.parentId.id : region.id.id,
      );
    }

    if (leadType.isSell() && marketType.isAfter() && objectType.isFlat()) {
      return this.sellFlatsAfterMarketRepository.byAreaAndRegionForLastMonth(
        area,
        region.parentId ? region.parentId.id : region.id.id,
      );
    }

    return null;
  }
}
