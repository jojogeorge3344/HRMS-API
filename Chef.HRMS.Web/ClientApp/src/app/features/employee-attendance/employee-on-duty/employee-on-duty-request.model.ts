import { Model } from '@shared/models/model';

export interface EmployeeOnDutyRequest extends Model {
    fromDate: Date;
    toDate: Date;
    isFullDay: boolean;
    isFirstDayFirstHalf: boolean;
    isFirstDaySecondHalf: boolean;
    isSecondDayFirstHalf: boolean;
    isSecondDaySecondHalf: boolean;
    numberOfDays: number;
    reason: string;
    employeeId: number;
    notifyPersonnel: number;
    isApproved: boolean;
}