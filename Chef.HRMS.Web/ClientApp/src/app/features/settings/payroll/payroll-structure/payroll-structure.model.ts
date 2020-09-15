import { Model } from '@shared/models/model';

export interface PayrollStructure extends Model {
  name: string;
  description: string;
  isConfigured: boolean;
}