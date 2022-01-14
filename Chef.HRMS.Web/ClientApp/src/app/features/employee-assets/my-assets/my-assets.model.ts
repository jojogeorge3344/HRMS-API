import { Model } from '@shared/models/model';
import { AssetChangeType } from 'src/app/models/common/types/assetchangetype';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
// import { AssetStatus } from 'src/app/models/common/types/raiserequeststatus';

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
  status: AssetStatus;
  description: string;
  changeType:AssetChangeType;
}

