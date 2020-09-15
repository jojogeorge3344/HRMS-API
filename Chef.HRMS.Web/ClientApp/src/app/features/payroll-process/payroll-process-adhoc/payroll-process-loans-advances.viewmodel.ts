import { Model } from '@shared/models/model';

export interface EmployeeLoanView extends Model {
  employeeid: number;
  employeeCode: number;
  name: string;
  loanType: string;
  loanId: number;
  loanNumber: string;
  amount: number;
  paygroupId: number;
  disbursementDate: Date;
  emiAmount: number;
  balanceAmount: number;
  remainingTenure: number;
  payrollProcessingMethodId: number;
  loanSettingId: number;
}
