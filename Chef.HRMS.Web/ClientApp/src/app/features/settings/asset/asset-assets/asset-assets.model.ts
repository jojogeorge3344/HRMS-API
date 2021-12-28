import { Model } from '@shared/models/model';

export interface AssetAssets extends Model {
  AssetId : number;
  AssetName: string;
  AssetTypeId :number;
  Date: Date;
  Metadatavalue1:string,
  Metadatavalue2:string,
  Metadatavalue3:string,
  Metadatavalue4:string,
  Metadatavalue5:string,
  Description:string;
  Status: number;
  IsActive: boolean;
  AssetTypeMetadataId : number;
  EmployeeId :number;
  }