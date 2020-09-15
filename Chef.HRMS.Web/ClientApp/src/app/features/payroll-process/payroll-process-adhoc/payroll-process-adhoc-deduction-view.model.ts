import { Model } from '@shared/models/model';

export interface AdhocDeductionView extends Model {
    employeeId: number;
    employeeCode: number;
    name: string;
    deductionId: number;
    deductionName: string;
    description: string;
    amount: number; 
    payrollProcessingMethodId: number; 
    currency: string;
  }
  