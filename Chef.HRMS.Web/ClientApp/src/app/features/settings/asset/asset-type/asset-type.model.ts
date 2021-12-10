import { Model } from '@shared/models/model';

export interface AssetType extends Model {
    name: string;
    description: string;
    numberOfEmployees?: number;
  }