import { StatisticsService } from '../../../domain/services/statistics.service';

import { LeadUrlDto } from '../DTO/leadUrl.dto';
import { LeadDataService } from './leadData.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadStatisticsService {
  constructor(
    private leadDataService: LeadDataService,
    private statisticsService: StatisticsService,
  ) {}

  async byUrl(leadUrl: LeadUrlDto) {
    const lead = await this.leadDataService.byUrl(leadUrl);
    if (null === lead) {
      throw Error('Lead is not found');
    }
    return {
      lead: lead,
      statistics: {
        monthly: await this.statisticsService.lastMonthForRegion(
          lead.type,
          lead.objectType,
          lead.marketType,
          lead.area,
          lead.region,
        ),
      },
    };
  }
}
