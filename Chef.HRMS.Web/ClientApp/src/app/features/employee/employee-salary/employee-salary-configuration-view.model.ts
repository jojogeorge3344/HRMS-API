import { Model } from '@shared/models/model';

export interface EmployeeSalaryConfigurationView extends Model {
    employeeId: number;
    employeeName: string;
    employeeCode: string;
    employeeSalaryConfigurationId: number;
    employeeSalaryConfigurationDetailsId: number;
    payrollCalculationId: number;
    payrollComponentId: number;
    payrollStructureId: number;
    shortCode: string;
    payrollComponentName: string;
    payrollStructureName: string;
    isComputed: boolean;
    formula: string;
    monthlyAmount: number;
    yearlyAmount: number;
    effectiveDate: string;
    version: string;
    maximumLimit: number;
}
