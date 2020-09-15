
import { Model } from '@shared/models/model';

export interface LeaveReport extends Model {
    employeeId: number;
    employeeCode: string;
    employeeName: string;
    department: number;
    leaveType: string;
    fromDate: Date;
    toDate: Date;
    appliedOn: Date;
    approvedBy: string;
    approvedOn: Date;
    numberOfDays: number;
}
