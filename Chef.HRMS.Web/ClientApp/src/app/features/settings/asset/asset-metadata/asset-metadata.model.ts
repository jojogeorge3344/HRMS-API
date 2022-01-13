import { Model } from '@shared/models/model';
import { MetadataDataType } from 'src/app/models/common/types/metadatadatatype';

export interface AssetTypeMetadata extends Model {
  assettypeId: number;
  metadata: string;
  assetDataType: MetadataDataType;
  isMandatory: boolean;
}
