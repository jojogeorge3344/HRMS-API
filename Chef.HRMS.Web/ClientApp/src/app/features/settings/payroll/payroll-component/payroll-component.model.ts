import { Model } from '@shared/models/model';

export interface PayrollComponent extends Model {
  name: string;
  payrollComponentType: number;
  shortCode: string;
  description: string;
}
