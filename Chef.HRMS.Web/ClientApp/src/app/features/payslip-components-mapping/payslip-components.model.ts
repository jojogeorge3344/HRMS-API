import { Model } from '@shared/models/model';

export interface PayslipComponents extends Model {
    code: string;
    name:string;
    structureId: number;
    structureName:string;
    payslipOrderNumber: number;
    isActive:boolean;
    payslipSettingDetails :PayslipSettingDetails[]
}
export interface PayslipSettingDetails extends Model { 
    payslipSettingId:number,
    payrollComponentId: number
}