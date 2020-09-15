import { Model } from '@shared/models/model';

export interface EmployeeDefaults extends Model { 
    probationduration :number,
    periodType :number,
    workerType:number,
    timetype:number 
  }