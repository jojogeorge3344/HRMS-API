import { Model } from '@shared/models/model';

export interface MyAssets extends Model {
  assetTypeId: string;
  assetId: string;
  assetTypeMetadataId: string;
  assetType: string;
  valueId: string;
  assetName: string;
  dateAllocated: Date;
  metadata:string;
  status:string;
  description:string;
  }

 