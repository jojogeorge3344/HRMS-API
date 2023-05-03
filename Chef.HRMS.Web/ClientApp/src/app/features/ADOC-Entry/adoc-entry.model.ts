import { Model } from '@shared/models/model';

export interface AdocEntry extends Model {
    employeeId: number;
    payrollcomponentId:number;
    employeeCode:string;
    amount: number;
    isAddition: boolean;
    adhocBFCode:string;
    remarks: string;
    status: number;
    date:string;
}