import { Model } from '@shared/models/model';

export interface PayslipConfiguration extends Model {
    id: number;
    includeFullNameOfComponents: boolean;
    includeNotApplicableComponents: boolean;
    includeLoanOrAdvanceDetails: boolean;
}
