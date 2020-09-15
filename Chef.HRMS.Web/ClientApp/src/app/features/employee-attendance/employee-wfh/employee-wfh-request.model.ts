import { Model } from '@shared/models/model';

export interface EmployeeWFHRequest extends Model {
    fromDate: Date;
    toDate: Date;
    reason: string;
    employeeId: number;
    notifyPersonnel: number;
    isApproved: boolean;
    numberOfDays: number;
}