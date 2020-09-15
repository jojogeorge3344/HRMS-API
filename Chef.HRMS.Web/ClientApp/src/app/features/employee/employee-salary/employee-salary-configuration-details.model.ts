import { Model } from '@shared/models/model';

export interface EmployeeSalaryConfigurationDetails extends Model {
    employeeId: number;
    employeeSalaryConfigurationId: number;
    payrollCalculationId: number;
    payrollComponentId?: number;
    payrollStructureId?: number;
    componentId?: number;
    structureId?: number;
    monthlyAmount: number;
    yearlyAmount: number;
}
