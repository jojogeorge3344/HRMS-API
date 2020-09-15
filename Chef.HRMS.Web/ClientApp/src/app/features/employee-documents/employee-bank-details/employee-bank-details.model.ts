import { Model } from '@shared/models/model';

export interface EmployeeBankDetails extends Model {
    employeeId: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    branchName: string;
    ifscCode: string;
} 