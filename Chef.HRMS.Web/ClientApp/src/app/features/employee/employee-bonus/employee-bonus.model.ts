import { Model } from '@shared/models/model';

export interface EmployeeBonus extends Model {
    amount: number;
    bonusTypeId: number;
    disburseOn: string;
    employeeId: number;
    id: number;
    remarks: string;
}
