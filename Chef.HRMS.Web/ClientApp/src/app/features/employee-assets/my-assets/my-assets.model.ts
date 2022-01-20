import { Model } from '@shared/models/model';
import { AssetChangeType } from 'src/app/models/common/types/assetchangetype';
import { AssetReturnType } from 'src/app/models/common/types/assetreturntype';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

export interface MyAssets extends Model {
  assetTypeId: number;
  assetId: number;
  empId: number;
  assetName: string;
  allocatedDate: Date;
  status: AssetStatus;
  description: string;
  changeDescription:string;
  returnDescription:string;
  returnDate:Date;
  changeType:AssetChangeType;
  returnType:AssetReturnType;
}

