import { Model } from '@shared/models/model';

export interface LoanRequest extends Model {
    comments:string,
    emiStartsFromMonth:number;
    emiStartsFromYear:number;
    employeeID:number,
    expectedOn:Date;
    loanAmount:number;
    loanNo:string;
    loanType:number;
    paymentType:number;
    repaymentTerm:number;
    requestedDate:Date;
    loanSettingId: number;
  }