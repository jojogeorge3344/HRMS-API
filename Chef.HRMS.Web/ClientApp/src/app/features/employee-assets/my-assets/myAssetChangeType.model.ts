import { Model } from '@shared/models/model';
import { AssetChangeType } from 'src/app/models/common/types/assetChangeType';

export interface MyAssetChangeType extends Model {
  changeType:AssetChangeType;
  description: string;
}
