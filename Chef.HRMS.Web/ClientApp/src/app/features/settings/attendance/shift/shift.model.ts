import { Model } from '@shared/models/model';

export interface Shift extends Model {
    name: string,
    startTime: string;
    endTime: string,
    breakDuration: number;
    numberOfDays: number;
    comments: string;  
    graceStartTime:string;
    graceEndTime:string;
    workingHours:string;
    minimumHours : string
  }