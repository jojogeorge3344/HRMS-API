import { Model } from '@shared/models/model';

export interface AssetTypeMetadata extends Model {
    name: string;
    datatype: string;
    ismandatory: boolean;
  }

  
