import { Model } from '@shared/models/model';

export interface AssetType extends Model {
    assettypename: string;
    description: string;
  }