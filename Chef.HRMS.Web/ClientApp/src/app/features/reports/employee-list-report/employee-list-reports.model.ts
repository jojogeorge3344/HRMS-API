
// import { Model } from '@shared/models/model';

export interface EmployeeListReport {
    employeeNumber: string;
    employeeName: string;
    dateOfBirth: Date;
    gender: number;
    dateOfJoin: Date;
    companyExperience: string;
    jobTitle: string;
    department: number;
    workerType: number;
    timeType: number;
    weekOff: number;
    leaveStructure: string;
    holidayCategory: string;
    shift: string;
    expensePolicy: string;
    payrollStructure: string;
    payGroup: string;
    overTimePolicy: string;
    createdDate?: string;
    modifiedDate?: string;
    createdBy?: number;
    modifiedBy?: number;
    id?: number;
    isArchived?: boolean;
}
