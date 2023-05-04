import { Model } from "@shared/models/model";

export interface EmployeeLeaveRequest extends Model {
  leaveStructureId: number;
  leaveComponentId: number;
  approvedBy: number;
  employeeId: number;
  employeeName: string;
  approvedDate: Date;
  currentDate: string;
  description: string;
  fromDate: Date;
  toDate: Date;
  rejoinDate: Date;
  leaveStatus: number;
  notifyPersonnel: string;
  numberOfDays: number;
  isFullDay: boolean;
  isFirstDayFirstHalf: boolean;
  isFirstDaySecondHalf: boolean;
  isSecondDayFirstHalf: boolean;
  isSecondDaySecondHalf: boolean;
}
