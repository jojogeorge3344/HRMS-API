import { Model } from '@shared/models/model';

export interface AdocEntry extends Model {
    employeeId: number;
    employeeCode:string;
    amount: number;
    isAddition: boolean;
    remarks: string;
    status: number;
    date:string;
}