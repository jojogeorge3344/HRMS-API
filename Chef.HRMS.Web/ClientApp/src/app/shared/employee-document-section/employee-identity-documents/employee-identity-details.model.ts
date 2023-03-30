
import { Model } from '@shared/models/model';

export interface EmployeeIdentityDetails extends Model {
    employeeId: number;
    documentType: string;
    documentNumber: number;
    dateOfIssue: Date;
    placeOfIssue: string;
    dateOfExpiry: Date;
    remarks: Date;
    refNo:Number;
    name:string;
    code:string;
    isExpired:boolean;
    expiryBeforeDays:number;
    displayOrder:number;
    documentReturnType:number;
    documentUpdateType:number;
    active:boolean;    
} 