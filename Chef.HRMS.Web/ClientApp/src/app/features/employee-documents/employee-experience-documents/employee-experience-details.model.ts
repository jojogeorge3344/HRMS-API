import { Model } from '@shared/models/model';

export interface EmployeeExperienceDetails extends Model { 
    companyName: string;
    dateOfJoining: Date;
    dateOfRelieving: Date;
    employeeId: number;
    jobTitle: string;
    location: string;
    isApproved: boolean;
}