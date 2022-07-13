import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadDataVo } from '../../../../domain/valueObjects/leadData.vo';
import { LeadInterface } from '../../../../domain/repository/lead.interface';
import { RealestateLeadsChild } from '../entity/realestateLeadsChild';
import { CrawledUrls } from '../entity/crawledUrls';
import { RegionIdVo } from '../../../../domain/valueObjects/regionId.vo';
import { CityIdVo } from '../../../../domain/valueObjects/cityId.vo';
import { RealestateLeads } from '../entity/realestateLeads';
import { LeadTypeIdFilter } from '../../filters/LeadTypeId.filter';
import { LeadTypeVo } from '../../../../domain/valueObjects/leadType.vo';
import { ObjectTypeFilter } from '../../filters/objectType.filter';
import { ObjectTypeVo } from '../../../../domain/valueObjects/objectType.vo';
import { MarketTypeFilter } from '../../filters/marketType.filter';
import { MarketTypeVo } from '../../../../domain/valueObjects/marketType.vo';

@Injectable()
export class LeadRepository implements LeadInterface {
  constructor(
    @InjectRepository(RealestateLeadsChild, 'realEstates')
    private leadsChild: Repository<RealestateLeadsChild>,
    @InjectRepository(RealestateLeads, 'realEstates')
    private leads: Repository<RealestateLeads>,
    @InjectRepository(CrawledUrls, 'realEstates')
    private crawledUrls: Repository<CrawledUrls>,
  ) {}

  async byUrl(url: string): Promise<LeadDataVo | null> {
    const crawledUrl = await this.crawledUrls.findOneBy({ url });

    if (null === crawledUrl) {
      return null;
    }

    const leadChild = await this.leadsChild.findOne({
      where: {
        crawled_url_id: crawledUrl.id,
      },
      relations: {
        building_type: true,
        region: true,
        city: true,
      },
    });

    if (null === leadChild) {
      return null;
    }

    let lead = await this.leads.findOne({
      where: {
        id: leadChild.parent_id,
      },
      relations: {
        building_type: true,
        region: true,
        city: true,
      },
    });

    if (null === lead) {
      lead = leadChild;
    }

    return {
      id: lead.id,
      url: lead.provider_lead_url,
      area: lead.area,
      price: lead.price,
      pricePerM: Math.floor(lead.price / lead.area),
      floor: lead.floor,
      maxFloor: lead.max_floor,
      rooms: lead.rooms,
      buildingTypeName: lead.building_type?.name,
      buildingYear: lead.building_year,
      image: lead.image,
      region: lead.region_id
        ? {
            id: new RegionIdVo(+lead.region_id),
            name: lead.region.name,
            parentId: lead.region.parent_id
              ? new RegionIdVo(+lead.region.parent_id)
              : null,
          }
        : null,
      city: lead.city_id
        ? {
            id: new CityIdVo(+lead.city_id),
            name: lead.city.name,
          }
        : null,
      objectType:
        lead.object_type_id === ObjectTypeFilter.flat()
          ? ObjectTypeVo.flat()
          : ObjectTypeVo.house(),
      type:
        lead.type_id === LeadTypeIdFilter.sell()
          ? LeadTypeVo.sell()
          : LeadTypeVo.rent(),
      marketType:
        lead.market_id === MarketTypeFilter.after()
          ? MarketTypeVo.after()
          : MarketTypeVo.primary(),
    };
  }
}
