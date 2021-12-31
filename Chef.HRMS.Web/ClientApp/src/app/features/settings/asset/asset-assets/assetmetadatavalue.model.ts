import { Model } from '@shared/models/model';


export interface AssetMetadataValue extends Model {  
    assettypeId: Number;
    assettypeMetadataId: Number;
    assetId: Number;
    value: String;
  }