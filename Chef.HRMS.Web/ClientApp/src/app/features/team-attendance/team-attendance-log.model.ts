import { Model } from '@shared/models/model';

export interface TeamAttendanceLog extends Model {
    attendanceType:  string;
    clockIn: Date;
    clockOut: Date;
    date: Date;
    department: number;
    employeeId: number;
    employeeName: string;
}
