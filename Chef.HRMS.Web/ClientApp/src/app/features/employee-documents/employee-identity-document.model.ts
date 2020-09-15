import { Model } from '@shared/models/model';

export interface EmployeeIdentityDocument extends Model {
    dateOfBirth: Date;
    employeeId: number;
    fatherName: string;
    isApproved: boolean;
    name: string;
    number: string;
}