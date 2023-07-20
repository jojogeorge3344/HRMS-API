import { Model } from '@shared/models/model';

export interface EmployeeEncashment extends Model {
    requestNum: number,
    requestDate: Date
    processDate:Date
    employeeId:number,
    annualLeaveBalance:number
    approvedAnnualLeave:number
    eosBalanceDays:number
    approvedEOSDays:number
    accruedTicketAmt:number
    approvedTicketAmt:number
    employeeEncashmentDetails:any
}