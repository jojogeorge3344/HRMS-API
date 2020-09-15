import { Model } from '@shared/models/model';

export interface EmployeeAttendanceLog extends Model {
    date: string;
    attendanceType:  string;
    clockIn: string;
    clockOut: string;
    effectiveHours: string;
    grossHours: string;
    isApproved:boolean;
}