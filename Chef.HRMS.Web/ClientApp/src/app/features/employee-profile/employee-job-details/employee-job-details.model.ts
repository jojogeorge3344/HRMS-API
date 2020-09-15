import { Model } from '@shared/models/model';

export interface EmployeeJobDetails extends Model {
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    reportingManager: number;
    employeeNumber: string;
    dateOfJoin : Date;
    noticePeriod : number;
    department: number;
    location: number;
    gender: number;
    jobTitleId: number;
    reportingTo: string;
}