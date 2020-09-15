import { Model } from '@shared/models/model';

export interface AdhocDeduction extends Model {
    employeeId: number;
    employeeCode: number;
    deductionName: string;
    description: string;
    currency: string;
    amount: number; 
  }
  