import { Model } from '@shared/models/model';

export interface AssetTypeMetadata extends Model {
  assettypeId: number;
  metadata: string;
  assetDataType: number;
  isMandatory: boolean;
}
