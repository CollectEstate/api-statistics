import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealestateLeadsChild } from '../../infrastructure/mysql/Realestates/entity/realestateLeadsChild';
import { LeadDataService } from './services/leadData.service';
import { ValuationController } from './controllers/valuation.controller';
import { CrawledUrls } from '../../infrastructure/mysql/Realestates/entity/crawledUrls';
import { RealestateBuildingTypes } from '../../infrastructure/mysql/Realestates/entity/realestateBuildingTypes';
import { LeadRepository } from '../../infrastructure/mysql/Realestates/repository/lead.repository';
import { RealestateRegions } from '../../infrastructure/mysql/Realestates/entity/realestateRegions';
import { RealestateCities } from '../../infrastructure/mysql/Realestates/entity/realestateCities';
import { RealestateLeads } from '../../infrastructure/mysql/Realestates/entity/realestateLeads';
import { LeadStatisticsService } from './services/leadStatistics.service';
import { StatisticsService } from '../../domain/services/statistics.service';
import { SellFlatsFromPrimaryMarketStatistics } from '../../infrastructure/mysql/statistics/repository/sellFlatsFromPrimaryMarket.statistics';
import { SellFlatsFromAfterMarketStatistics } from '../../infrastructure/mysql/statistics/repository/sellFlatsFromAfterMarket.statistics';
import { StatisticsCrossAggregates } from '../../infrastructure/mysql/statistics/entity/statisticsCrossAggregates';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        RealestateLeads,
        RealestateLeadsChild,
        CrawledUrls,
        RealestateBuildingTypes,
        RealestateRegions,
        RealestateCities,
      ],
      'realEstates',
    ),
    TypeOrmModule.forFeature([StatisticsCrossAggregates], 'statistics'),
  ],
  providers: [
    LeadDataService,
    LeadRepository,
    LeadStatisticsService,
    StatisticsService,
    SellFlatsFromPrimaryMarketStatistics,
    SellFlatsFromAfterMarketStatistics,
  ],
  controllers: [ValuationController],
})
export class ValuationModule {}
