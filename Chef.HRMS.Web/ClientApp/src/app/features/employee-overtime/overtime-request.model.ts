import { Model } from '@shared/models/model';

export interface OvertimeRequest extends Model {
    overTimePolicyId: number;
    fromDate: Date;
    toDate: Date;
    numberOfHours: number;
    reason: string;
    employeeId: number;
    requestStatus: number;
    normalOverTime:number,
    holidayOverTime:number,
    specialOverTime:number,
    employeeName:any,
    
}