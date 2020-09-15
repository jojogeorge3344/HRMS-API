import { Model } from '@shared/models/model';

export interface PayrollBasicComponent extends Model {
    employeeCode: string;
    employeeName: string;
    payrollComponentName: string;
    payrollProcessingMethodId: number;
    shortCode: string;
    monthlyAmount: number;
    employeeId: number;
    componentId: number;
    payrollComponentId: number;
    payGroupId: number;
    structureId: number;
    payrollStructureId: number;
    payrollProcessingStatus: number;
}
