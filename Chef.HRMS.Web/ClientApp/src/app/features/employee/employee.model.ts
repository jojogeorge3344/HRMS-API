import { Model } from '@shared/models/model';

export interface Employee extends Model {
    leaveStructureId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    jobDetailsId: number;
    department: number;
    location: number;
    jobFilingId: number;
    employeeNumber: string;
    id: number;
    fullName: string;
    shortCode: string;
    notifyPersonnel:number;
}