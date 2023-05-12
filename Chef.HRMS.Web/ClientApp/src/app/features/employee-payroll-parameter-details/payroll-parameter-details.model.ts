import { Model } from '@shared/models/model';

export interface PayrollParameterDetails extends Model {
    id:number;
    employeeId:number;
    userVariableId: number;
    type: number;
    transDate:string;
    transValue:number;
    status:number;
    remarks:string;
}