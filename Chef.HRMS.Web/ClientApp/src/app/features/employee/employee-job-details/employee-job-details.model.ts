import { Model } from '@shared/models/model';

export interface EmployeeJobDetails extends Model {
    employeeId: number;
    dateOfJoin : Date;
    numberSeriesId: number;
    employeeNumber: string;
    jobTitleId: number;
    secondaryJobTitle: string;
    businessUnit: number;
    department: number;
    location: number;
    reportingManager: number;
    workerType: number;
    timeType : number;
    probationPeriod : number;
    periodType : number;
    noticePeriod : number;
    branchId: number;
    companyId: number;
}
