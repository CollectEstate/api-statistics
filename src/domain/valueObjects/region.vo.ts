import { RegionIdVo } from './regionId.vo';

export class RegionVo {
  id: RegionIdVo;
  name: string;
  parentId: RegionIdVo | null;
}
