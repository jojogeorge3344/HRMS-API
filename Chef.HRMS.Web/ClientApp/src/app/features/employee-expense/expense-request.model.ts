import { Model } from '@shared/models/model';

export interface ExpenseRequest extends Model {
    name: string;
    expenseConfigurationId: number;
    expenseTypeId: number;
    expenseTypeName: string;
    expensePolicyId: number;
    expensePolicyName: string;
    expenseDate: Date;
    currency:string;
    mileageUnit: number;
    mileageCovered: number;
    mileageRate: number;
    amount: number;
    comment: string;
    employeeId: number;
    requestStatus: number;
    isReceiptAttached: boolean;
}
