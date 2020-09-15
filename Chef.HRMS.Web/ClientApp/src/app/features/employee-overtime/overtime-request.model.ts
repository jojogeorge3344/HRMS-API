import { Model } from '@shared/models/model';

export interface OvertimeRequest extends Model {
    overTimePolicyId: number;
    fromDate: Date;
    toDate: Date;
    numberOfHours: number;
    reason: string;
    employeeId: number;
    requestStatus: number;
}