import { Model } from '@shared/models/model';

export interface TeamLeaveLog extends Model {
    date: string;
    department: number;
    employeeId: number;
    employeeName: string;
    appliedDate: string;
    fromDate: string;
    leaveType: string;
    leaveTypeId: number;
    onLeaveToday: number;
    reason: string;
    toDate: string;
}
