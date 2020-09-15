import { Model } from '@shared/models/model';

export interface PayrollCalculation extends Model {
    payrollComponentId: number;
    payrollStructureId: number;
    shortCode: string;
    isComputed: boolean;
    formula: string;
}
