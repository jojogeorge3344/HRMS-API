import { Model } from '@shared/models/model';

export interface AssetAssets extends Model {  
  AssetId:number;
  AssetName:string;
  AssetTypeId:number;
  Date:Date;
  Description:string;
  Status:number;
  IsActive:boolean;
  AssetTypeMetadataId:number;
  EmployeeId:number;

  }