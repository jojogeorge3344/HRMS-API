import { Model } from '@shared/models/model';

export interface LopSettings extends Model {
    canFullMonth: boolean;
    fixedValue: number;
    formula: string;
    id: number;
    isFormulaBased: boolean;
    isWorkingDaysOnly: boolean;
    lopCalculation: number;
}
