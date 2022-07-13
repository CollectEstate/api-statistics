import { Injectable } from '@nestjs/common';
import { LeadUrlDto } from '../../application/valuation/DTO/leadUrl.dto';
import { LeadDataVo } from '../valueObjects/leadData.vo';
import { LeadInterface } from '../repository/lead.interface';

@Injectable()
export class LeadDataService {
  constructor(private leads: LeadInterface) {}

  async byUrl(url: LeadUrlDto): Promise<LeadDataVo | null> {
    const lead = await this.leads.byUrl(url.url);

    if (null === lead) {
      return null;
    }

    return {
      id: lead.id,
      url: lead.url,
      area: lead.area,
      price: lead.price,
      pricePerM: Math.floor(lead.price / lead.area),
      floor: lead.floor,
      maxFloor: lead.maxFloor,
      rooms: lead.rooms,
      buildingTypeName: lead.buildingTypeName,
      buildingYear: lead.buildingYear,
      image: lead.image,
      region: lead.region,
      city: lead.city,
      objectType: lead.objectType,
      marketType: lead.marketType,
      type: lead.type,
    };
  }
}
