import { Model } from '@shared/models/model';
import { AssetType } from '../asset-type/asset-type.model';


export interface assetmetadata extends Model {
    name: string;
    description: string;
    numberOfEmployees?: number;
  }
export interface AssetTypeMetadata extends Model {
    assettypeId: any;
    metadata: string;
    assetmetadataname: string;
    datatype: string;
    ismandatory: boolean;
    assetDatatype:string;
  }

