import { Model } from '@shared/models/model';

export interface PayrollCalculationView extends Model {
    id: number;
    payrollComponentId: number;
    payrollStructureId:  number;
    payrollStructureName: string
    name: string;
    shortCode:string;
    isComputed: boolean;
    isFixed: boolean;
    formula: string;
}