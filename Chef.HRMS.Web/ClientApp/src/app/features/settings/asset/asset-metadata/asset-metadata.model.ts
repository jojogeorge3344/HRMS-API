import { Model } from '@shared/models/model';

export interface assetmetadata extends Model {
    name: string;
    description: string;
    numberOfEmployees?: number;
  }