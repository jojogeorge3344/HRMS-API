import { Model } from '@shared/models/model';

export interface AssetTypeMetadata extends Model {
    assetmetadataname: string;
    datatype: string;
    ismandatory: boolean;
  }

  