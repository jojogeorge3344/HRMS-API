import { Model } from '@shared/models/model';
import { Employee } from '@features/employee/employee.model';

export interface ExpenseRequest extends Model {
    name: string;
    expenseConfigurationId: number;
    expenseTypeId: number;
    expenseTypeName: string;
    expensePolicyId: number;
    expensePolicyName: string;
    expenseDate: Date;
    currency: string;
    mileageUnit: number;
    mileageCovered: number;
    mileageRate: number;
    amount: number;
    comment: string;
    employeeId: number;
    requestStatus: number;
    isReceiptAttached: boolean;
    approvedBy: number;
    approvedDate: Date;
    employee?: Employee;
    type?: string;
}
