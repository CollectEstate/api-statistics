import { LeadDataVo } from '../../../domain/valueObjects/leadData.vo';
import { StatisticsVo } from '../../../domain/valueObjects/statistics.vo';

export interface LeadStatisticsDto {
  lead: LeadDataVo;
  statistics: {
    lastMonth: StatisticsVo;
    lastYear: StatisticsVo[];
  };
}
