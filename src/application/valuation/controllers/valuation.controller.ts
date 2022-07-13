import { Controller, Get, Inject, Query } from '@nestjs/common';
import { LeadUrlDto } from '../DTO/leadUrl.dto';
import { ApiTags } from '@nestjs/swagger';
import { LeadStatisticsService } from '../services/leadStatistics.service';

@ApiTags('Valuation')
@Controller('v1/valuation')
export class ValuationController {
  constructor(private leadStatistics: LeadStatisticsService) {}

  @Get('lead')
  async byUrl(@Query() leadUrl: LeadUrlDto): Promise<any> {
    return {
      data: await this.leadStatistics.byUrl(leadUrl),
    };
  }
}
