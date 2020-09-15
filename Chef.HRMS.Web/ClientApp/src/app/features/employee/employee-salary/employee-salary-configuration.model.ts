import { Model } from '@shared/models/model';

export interface EmployeeSalaryConfiguration extends Model {
    employeeId: number;
    effectiveDate: string;
    version: string;
}