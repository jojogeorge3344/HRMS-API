import { Model } from '@shared/models/model';

export interface assetmetadata extends Model {
    name: string;
    description: string;
    numberOfEmployees?: number;
  }
export interface AssetTypeMetadata extends Model {
    metadata: string;
    assetmetadataname: string;
    datatype: string;
    ismandatory: boolean;
    assetDatatype:string;
  }

  
