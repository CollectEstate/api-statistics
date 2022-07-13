import { Inject, Injectable } from '@nestjs/common';
import { LeadDataService as leadDataDomainService } from '../../../domain/services/leadData.service';
import { LeadInterface } from '../../../domain/repository/lead.interface';
import { LeadRepository } from '../../../infrastructure/mysql/Realestates/repository/lead.repository';

@Injectable()
export class LeadDataService extends leadDataDomainService {
  constructor(
    @Inject(LeadRepository)
    leads: LeadInterface,
  ) {
    super(leads);
  }
}
