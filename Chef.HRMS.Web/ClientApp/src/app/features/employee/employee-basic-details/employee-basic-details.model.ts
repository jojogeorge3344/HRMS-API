import { Model } from '@shared/models/model';

export interface EmployeeBasicDetails extends Model { 
    firstName :string;
    middleName :string;
    lastName :string;
    displayName :string;
    gender : number;
    dateOfBirth : Date;
    email :string;
    uid:string,
    language:string,
    remarks:string,
    refno:string
}