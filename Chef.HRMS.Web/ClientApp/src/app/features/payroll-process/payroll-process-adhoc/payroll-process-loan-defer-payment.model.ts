import { Model } from '@shared/models/model';

export interface DeferPayment extends Model {
    employeeId: number;
    loanNumber: string;
    deferPeriod: number;
    paymentPeriodType: number;
    description: string;
  }