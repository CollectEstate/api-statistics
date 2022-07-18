import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsCrossAggregates } from '../entity/statisticsCrossAggregates';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { StatisticsVo } from '../../../../domain/valueObjects/statistics.vo';
import { GroupTypeFilter } from '../../filters/groupType.filter';
import { StatisticsRepository } from '../../../../domain/repository/statisticsRepository';
import { LeadTypeVo } from '../../../../domain/valueObjects/leadType.vo';
import { MarketTypeVo } from '../../../../domain/valueObjects/marketType.vo';
import { ObjectTypeVo } from '../../../../domain/valueObjects/objectType.vo';
import { LeadTypeIdFilter } from '../../filters/LeadTypeId.filter';
import { MarketTypeFilter } from '../../filters/marketType.filter';
import { ObjectTypeFilter } from '../../filters/objectType.filter';

enum areaGroup {
  range0to38sm = 1,
  range38to70,
  above70,
}

export class Statistics implements StatisticsRepository {
  constructor(
    @InjectRepository(StatisticsCrossAggregates, 'statistics')
    private statistics: Repository<StatisticsCrossAggregates>,
  ) {}

  async forRegion(
    leadType: LeadTypeVo,
    marketType: MarketTypeVo,
    objectType: ObjectTypeVo,
    area: number,
    regionId: number,
    monthsBeforeNow: number,
  ): Promise<StatisticsVo[] | null> {
    const query = this.getBaseQuery(
      area,
      monthsBeforeNow,
      this.getLeadTypeId(leadType),
      this.getMarketTypeId(marketType),
      this.getObjectTypeId(objectType),
    );

    query.andWhere(`stats.region_id = ${regionId}`);

    const statistics = await query.getMany();

    if (null === statistics) {
      return null;
    }

    return this.mapAggregationToVO(statistics);
  }

  private getLeadTypeId(leadType: LeadTypeVo): number {
    return leadType.isSell()
      ? LeadTypeIdFilter.sell()
      : LeadTypeIdFilter.rent();
  }

  private getMarketTypeId(marketType: MarketTypeVo): number {
    return marketType.isAfter()
      ? MarketTypeFilter.after()
      : MarketTypeFilter.primary();
  }

  private getObjectTypeId(objectType: ObjectTypeVo): number {
    return objectType.isFlat()
      ? ObjectTypeFilter.flat()
      : ObjectTypeFilter.house();
  }

  private getBaseQuery(
    area: number,
    monthsBeforeNow: number,
    leadType: number,
    marketType: number,
    objectType: number,
  ): SelectQueryBuilder<StatisticsCrossAggregates> {
    const query = this.statistics
      .createQueryBuilder('stats')
      .where(`stats.group_type = '${GroupTypeFilter.area()}'`)
      .andWhere(`stats.group_value = '${this.areaGroupType(area)}'`);

    const monthDateQuery: string[] = [];
    for (let month = 0; month <= monthsBeforeNow; month++) {
      monthDateQuery.push(
        `stats.month_date = '${this.getPreviousMonthLastDayDate(month)}'`,
      );
    }
    query.andWhere(`(${monthDateQuery.join(' or ')})`);
    query
      .andWhere(`stats.market_id = ${marketType}`)
      .andWhere(`stats.object_type_id = ${objectType}`)
      .andWhere(`stats.type_id = ${leadType}`);

    return query;
  }
  private mapAggregationToVO(
    statistics: StatisticsCrossAggregates[],
  ): StatisticsVo[] {
    const mappedStatistics: StatisticsVo[] = [];

    statistics.map((stats: StatisticsCrossAggregates) => {
      mappedStatistics.push({
        date: this.getMonthDate(stats.month_date),
        pricePerMCount: Math.floor(stats.price_per_m_count),
        pricePerMMean: Math.floor(stats.price_per_m_mean),
        pricePerMStd: Math.floor(stats.price_per_m_std),
        pricePerMMin: Math.floor(stats.price_per_m_min),
        pricePerMMax: Math.floor(stats.price_per_m_max),
        pricePerM5percentage: Math.floor(stats.price_per_m_5_perc),
        pricePerM25percentage: Math.floor(stats.price_per_m_25_perc),
        pricePerMMedian: Math.floor(stats.price_per_m_median),
        pricePerM75percentage: Math.floor(stats.price_per_m_75_perc),
        pricePerM95percentage: Math.floor(stats.price_per_m_95_perc),
      });
    });

    return mappedStatistics;
  }

  private getPreviousMonthLastDayDate(previousMonth = 0): string {
    const d = new Date();
    d.setMonth(d.getMonth() - previousMonth);
    d.setDate(1);
    d.setHours(-1);

    return d.toISOString().slice(0, 10).replace('T', ' ');
  }

  private areaGroupType(area: number): string {
    if (area < 38) {
      return String(areaGroup.range0to38sm);
    }

    if (area > 38 && area < 70) {
      return String(areaGroup.range38to70);
    }

    if (area > 70) {
      return String(areaGroup.above70);
    }
  }

  private getMonthDate(MonthDate: string) {
    const date = new Date(MonthDate);
    return date.toISOString().slice(0, 7).replace('T', ' ');
  }
}
