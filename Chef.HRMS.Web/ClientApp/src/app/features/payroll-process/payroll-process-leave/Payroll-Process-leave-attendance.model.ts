import { Model } from "@shared/models/model";

export interface PayrollLeaveAndAttandance extends Model {
  payrollProcessingMethodId: number;
  employeeId: number;
  payGroupId?: number;
  numberOfWorkingDays: number;
  numberOfWorkedDays: number;
  leaveApplied: number;
  approvedLeaves: number;
  unapprovedLeaves: number;
  lop?: number;
  unmarkedAttendance: number;
  payrollProcessingStatus: number;
}
