
import { Model } from '@shared/models/model';

export interface AttendanceReport extends Model {
    employeeNumber: string,
    employeeName: string,
    department: number,
    date: Date,
    shift: string,
    inTime: Date,
    outTime: Date,
    workingHours: string,
    attendanceType: string
}