import { LeadTypeVo } from '../valueObjects/leadType.vo';
import { ObjectTypeVo } from '../valueObjects/objectType.vo';
import { MarketTypeVo } from '../valueObjects/marketType.vo';
import { RegionVo } from '../valueObjects/region.vo';
import { StatisticsRepository } from '../repository/statisticsRepository';
import { StatisticsVo } from '../valueObjects/statistics.vo';
import { Inject, Injectable } from '@nestjs/common';
import { Statistics } from '../../infrastructure/mysql/statistics/repository/statistics';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(Statistics)
    private statistics: StatisticsRepository,
  ) {}

  async lastMonthForRegion(
    leadType: LeadTypeVo,
    objectType: ObjectTypeVo,
    marketType: MarketTypeVo,
    area: number,
    region: RegionVo,
  ): Promise<StatisticsVo | null> {
    const stats: StatisticsVo[] = await this.statistics.forRegion(
      leadType,
      marketType,
      objectType,
      area,
      region.parentId ? region.parentId.id : region.id.id,
      0,
    );

    if (null === stats) {
      return null;
    }

    return stats.shift();
  }

  async lastYearForRegion(
    leadType: LeadTypeVo,
    objectType: ObjectTypeVo,
    marketType: MarketTypeVo,
    area: number,
    region: RegionVo,
  ): Promise<StatisticsVo[] | null> {
    return this.statistics.forRegion(
      leadType,
      marketType,
      objectType,
      area,
      region.parentId ? region.parentId.id : region.id.id,
      11,
    );
  }
}
