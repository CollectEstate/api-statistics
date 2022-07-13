import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealestateLeadsChild } from './infrastructure/mysql/Realestates/entity/realestateLeadsChild';
import { ValuationModule } from './application/valuation/valuation.module';
import { CrawledUrls } from './infrastructure/mysql/Realestates/entity/crawledUrls';
import { RealestateBuildingTypes } from './infrastructure/mysql/Realestates/entity/realestateBuildingTypes';
import { RealestateRegions } from './infrastructure/mysql/Realestates/entity/realestateRegions';
import { RealestateCities } from './infrastructure/mysql/Realestates/entity/realestateCities';
import { RealestateLeads } from './infrastructure/mysql/Realestates/entity/realestateLeads';
import { StatisticsCrossAggregates } from './infrastructure/mysql/statistics/entity/statisticsCrossAggregates';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'realEstates',
      type: 'mysql',
      host: '195.78.67.35',
      port: 3306,
      username: 'sydjkpovxw_readonly',
      password: '-ac5*-Zn5Hc)PtVX',
      database: 'sydjkpovxw_scraper',
      entities: [
        RealestateLeads,
        RealestateLeadsChild,
        CrawledUrls,
        RealestateBuildingTypes,
        RealestateRegions,
        RealestateCities,
      ],
      synchronize: false,
    }),
    TypeOrmModule.forRoot({
      name: 'statistics',
      type: 'mysql',
      host: '195.78.67.35',
      port: 3306,
      username: 'sydjkpovxw_statistics',
      password: '2cF+@3+m13I3##H',
      database: 'sydjkpovxw_statistics',
      entities: [StatisticsCrossAggregates],
      synchronize: false,
    }),
    ValuationModule,
  ],
})
export class AppModule {}
