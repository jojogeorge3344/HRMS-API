import { Model } from '@shared/models/model';
import { AssetChangeType } from 'src/app/models/common/types/assetchangetype';
import { AssetReturnType } from 'src/app/models/common/types/assetreturntype';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

export interface MyAssets extends Model {
  assetTypeId: number;
  assetId: number;
  assetTypeMetadataId: number;
  empId: number;
  assetTypeName: string;
  valueId: number;
  assetName: string;
  dateAllocated: Date;
  metadata: string;
  status: AssetStatus;
  description: string;
  changeDescription:string;
  returnDescription:string;
  returnDate:Date;
  changeType:AssetChangeType;
  returnType:AssetReturnType;
}

