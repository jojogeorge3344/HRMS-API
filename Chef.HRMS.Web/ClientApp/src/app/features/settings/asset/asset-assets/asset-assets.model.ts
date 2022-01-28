import { Model } from '@shared/models/model';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { AssetMetadataValue } from './assetmetadatavalue.model';

export interface AssetAssets extends Model {  
  assetTypeId:number;
  assetTypeMetadataId:number;
  assetName:string;
  date:string;
  description:string;
  status: number;
  isActive:boolean;
  valueId: number;
 // AssetTypeName:string;
  // assetId:number;
  // metaData:string; 
  assetMetadataValues: AssetMetadataValue[];
  }
  
