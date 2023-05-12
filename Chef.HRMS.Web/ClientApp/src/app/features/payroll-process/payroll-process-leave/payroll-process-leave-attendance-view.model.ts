import { Model } from "@shared/models/model";

export interface PayrollLeaveAndAttandanceViewModel extends Model {
  employeeId: number;
  employeeName: string;
  employeeCode: string;
  numberOfWorkingDays?: number;
  numberOfWorkedDays?: number;
  leaveApplied: number;
  approvedLeaves: number;
  lop?: number;
  weekoff?: number;
  unapprovedLeaves: number;
  unmarkedAttendance: number;
  numberOfHolidays: number;
  payrollProcessDate:Date
  payrollProcessId:number
}
