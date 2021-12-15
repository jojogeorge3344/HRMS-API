import { Model } from '@shared/models/model';
import { AssetType } from '../asset-type/asset-type.model';

export interface AssetTypeMetadata extends Model {
  assettypeId: number;
  metadata: string;
  datatype: string;
  ismandatory: boolean;
}


