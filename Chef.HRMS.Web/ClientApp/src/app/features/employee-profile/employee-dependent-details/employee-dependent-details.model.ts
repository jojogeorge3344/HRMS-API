import { Model } from '@shared/models/model';

export interface EmployeeDependentDetails extends Model {
    employeeId: number;
    name: string;
    dateOfBirth: Date;
    gender: number;
    phone: string;
    phoneCode: string;
    relationship: string;
    profession: string;
} 