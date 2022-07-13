import { LeadDataVo } from '../valueObjects/leadData.vo';

export interface LeadInterface {
  byUrl(url: string): Promise<LeadDataVo>;
}
