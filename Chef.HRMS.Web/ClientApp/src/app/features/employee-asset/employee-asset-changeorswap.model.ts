import { AssetMetadataValue } from '@settings/asset/asset-assets/assetmetadatavalue.model';
import { Model } from '@shared/models/model';

export interface changeorswap extends Model {  
    currentAssetId:number;
    currentAssetName: string;
    currentMetadatas:AssetMetadataValue[];
    newAssetType:string;
    newAssetId:number;
    newAssetName:string;
    newMetadatas:AssetMetadataValue[];
    description:string;
  }