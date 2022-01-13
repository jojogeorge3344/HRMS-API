import { Model } from '@shared/models/model';
import { AssetChangeType } from 'src/app/models/common/types/assetchangetype';

export interface MyAssets extends Model {
  assetTypeId: number;
  assetId: number;
  assetTypeMetadataId: number;
  empId: number;
  assetType: string;
  valueId: number;
  assetName: string;
  dateAllocated: Date;
  metadata: string;
  status: string;
  description: string;
  changeType:AssetChangeType;
}

