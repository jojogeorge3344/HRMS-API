import { Model } from '@shared/models/model';

export interface EmployeeNumbers extends Model {
    name: string;
    description: string;
    prefix: string;
    suffix: string;
    nextNumber: number;
    digitInNumber:number,
    isActive :boolean,
    //  defaultvalue:boolean,
  }