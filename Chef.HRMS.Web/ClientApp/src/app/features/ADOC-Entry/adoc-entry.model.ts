import { Model } from '@shared/models/model';

export interface AdocEntry extends Model {
    employeeId: number;
    payrollcomponentId:number;
    amount: number;
    isAddition: boolean;
    adhocBFCode:string;
    remarks: string;
    status: number;
    employeeName:string; 
    employeeCode:string;
    date:string;
}