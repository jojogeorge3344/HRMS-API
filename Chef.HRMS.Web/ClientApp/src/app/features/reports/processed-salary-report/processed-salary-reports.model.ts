
// import { Model } from '@shared/models/model';

import { Model } from '@shared/models/model';

export interface ProcessedSalaryReport extends Model {
    employeeId: number;
    employeeCode: string;
    employeeName: string;
    payGroup: string;
    payrollMonth: string;
    payrollYear: number;
    basicComponent: number;
    lop: number;
    lopDeduction: number;
    bonus: number;
    loanOrAdvance: number;
    adhocDeduction: number;
    loanRepayment: number;
    total: string;
}
