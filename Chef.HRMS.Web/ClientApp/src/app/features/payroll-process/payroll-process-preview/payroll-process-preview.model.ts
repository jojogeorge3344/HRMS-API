import { Model } from '@shared/models/model';

export interface PayrollReview extends Model {
    employeeId: number;
    employeeName: string;
    employeeCode: string;
    basic: number;
    loanAmount: number;
    loanNumber: string;
    lopCount: number;
    lopAmount: number;
    bonus: number;
    deduction: number;
    deductionName: string;
    loanType: number;
    emiAmount: number;
    totalSalary: number;
  }