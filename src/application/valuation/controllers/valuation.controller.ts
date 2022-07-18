import { Controller, Get, Inject, Query } from '@nestjs/common';
import { LeadUrlDto } from '../DTO/leadUrl.dto';
import { ApiTags } from '@nestjs/swagger';
import { LeadStatisticsService } from '../services/leadStatistics.service';
import { LeadStatisticsDto } from '../DTO/leadStatistics.dto';
import { LeadStatisticsViewModel } from '../viewModel/leadStatistics.viewModel';
import { StatisticsVo } from '../../../domain/valueObjects/statistics.vo';

@ApiTags('Valuation')
@Controller('v1/valuation')
export class ValuationController {
  constructor(private leadStatistics: LeadStatisticsService) {}

  @Get('lead')
  async byUrl(@Query() leadUrl: LeadUrlDto): Promise<LeadStatisticsViewModel> {
    const statistics: LeadStatisticsDto = await this.leadStatistics.byUrl(
      leadUrl,
    );
    return {
      data: {
        lead: {
          url: statistics.lead.url,
          area: statistics.lead.area,
          price: statistics.lead.price,
          pricePerM: statistics.lead.pricePerM,
          floor: statistics.lead.floor,
          maxFloor: statistics.lead.maxFloor,
          rooms: statistics.lead.rooms,
          buildingTypeName: statistics.lead.buildingTypeName,
          buildingYear: statistics.lead.buildingYear,
          image: statistics.lead.image,
          regionName: statistics.lead.region.name,
          cityName: statistics.lead.city.name,
        },
        statistics: {
          lastMonth: {
            region: {
              date: statistics.statistics.lastMonth.date,
              pricePerMCount: statistics.statistics.lastMonth.pricePerMCount,
              pricePerMMean: statistics.statistics.lastMonth.pricePerMMean,
              pricePerMStd: statistics.statistics.lastMonth.pricePerMStd,
              pricePerMMin: statistics.statistics.lastMonth.pricePerMMin,
              pricePerMMax: statistics.statistics.lastMonth.pricePerMMax,
              pricePerM5percentage:
                statistics.statistics.lastMonth.pricePerM5percentage,
              pricePerM25percentage:
                statistics.statistics.lastMonth.pricePerM25percentage,
              pricePerMMedian: statistics.statistics.lastMonth.pricePerMMedian,
              pricePerM75percentage:
                statistics.statistics.lastMonth.pricePerM75percentage,
              pricePerM95percentage:
                statistics.statistics.lastMonth.pricePerM95percentage,
            },
          },
          lastYear: {
            region: {
              pricePerM: {
                avg: statistics.statistics.lastYear.map(
                  (stats: StatisticsVo) => {
                    return {
                      date: stats.date,
                      value: stats.pricePerMMean,
                    };
                  },
                ),
                median: statistics.statistics.lastYear.map(
                  (stats: StatisticsVo) => {
                    return {
                      date: stats.date,
                      value: stats.pricePerMMean,
                    };
                  },
                ),
              },
            },
          },
        },
      },
    };
  }
}
