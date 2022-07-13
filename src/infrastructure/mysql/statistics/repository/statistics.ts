import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsCrossAggregates } from '../entity/statisticsCrossAggregates';
import { Repository } from 'typeorm';
import { StatisticsVo } from '../../../../domain/valueObjects/statistics.vo';
import { GroupTypeFilter } from '../../filters/groupType.filter';

enum areaGroup {
  range0to38sm = 1,
  range38to70,
  above70,
}
export abstract class Statistics {
  constructor(
    @InjectRepository(StatisticsCrossAggregates, 'statistics')
    private statistics: Repository<StatisticsCrossAggregates>,
  ) {}

  protected abstract getObjectTypeId(): number;
  protected abstract getTypeId(): number;
  protected abstract getMarketId(): number;

  async byAreaAndRegionForLastMonth(
    area: number,
    regionId: number,
  ): Promise<StatisticsVo[] | null> {
    return this.byAreaAndRegionForGivenMonth(area, regionId, 0);
  }

  private async byAreaAndRegionForGivenMonth(
    area: number,
    regionId: number,
    monthsBeforeCurrent = 0,
  ): Promise<StatisticsVo[] | null> {
    const statistics = await this.statistics.find({
      where: {
        group_type: GroupTypeFilter.area(),
        group_value: this.areaGroupType(area),
        month_date: this.getPreviousMonthLastDayDate(monthsBeforeCurrent),
        market_id: this.getMarketId(),
        object_type_id: this.getObjectTypeId(),
        type_id: this.getTypeId(),
        region_id: regionId,
      },
    });

    if (null === statistics) {
      return null;
    }

    const mappedStatistics: StatisticsVo[] = [];

    statistics.forEach((singleStatisticRow) => {
      mappedStatistics.push({
        pricePerMCount: singleStatisticRow.price_per_m_count,
        pricePerMMean: singleStatisticRow.price_per_m_mean,
        pricePerMStd: singleStatisticRow.price_per_m_std,
        pricePerMMin: singleStatisticRow.price_per_m_min,
        pricePerMMax: singleStatisticRow.price_per_m_max,
        pricePerM5percentage: singleStatisticRow.price_per_m_5_perc,
        pricePerM25percentage: singleStatisticRow.price_per_m_25_perc,
        pricePerMMedian: singleStatisticRow.price_per_m_median,
        pricePerM75percentage: singleStatisticRow.price_per_m_75_perc,
        pricePerM95percentage: singleStatisticRow.price_per_m_95_perc,
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
}
