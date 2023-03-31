import { Model } from '@shared/models/model';

export interface EmployeeEducationalDetails extends Model {
    employeeId: number;
    degree: string;
    percentage: number;
    specialization: string;
    university: string;
    yearOfCompletion: Date;
    yearOfJoining: Date;
    isApproved: boolean;   
} 