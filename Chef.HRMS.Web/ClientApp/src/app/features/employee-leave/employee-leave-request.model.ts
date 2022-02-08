import { Model } from '@shared/models/model';

export interface EmployeeLeaveRequest extends Model {
    leaveStructureId: number;
    leaveComponentId: number;
    approvedBy: number;
    employeeId: number;
    approvedDate: Date;
    currentDate:Date;
    description: string;
    fromDate: Date;
    toDate : Date;
    leaveStatus: number;
    notifyPersonnel: string;
    numberOfDays: number;
    isFullDay:boolean;
    isFirstDayFirstHalf:boolean; 
    isFirstDaySecondHalf:boolean;
    isSecondDayFirstHalf:boolean; 
    isSecondDaySecondHalf:boolean; 
  }