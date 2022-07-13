import { StatisticsVo } from '../valueObjects/statistics.vo';

export interface StatisticsRepository {
  byAreaAndRegionForLastMonth(
    area: number,
    regionId: number,
  ): Promise<StatisticsVo[] | null>;
}
