import { Model } from '@shared/models/model';

export interface MyAssets extends Model {
  assetTypeId: number;
  assetId: string;
  assetTypeMetadataId: string;
  empId: string;
  assetType: string;
  valueId: string;
  assetName: string;
  dateAllocated: Date;
  metadata: string;
  status: string;
  description: string;
}

