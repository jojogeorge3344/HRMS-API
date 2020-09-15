import { Model } from '@shared/models/model';

export interface LeaveConfigurationRestrictions extends Model {
    canApplyHalfDay
    canEmployeeApplyLeave
    canApplyLeaveDuringProbation
    canApplyLeaveDuringNoticePeriod
    canApplyForFutureDate
    canReportingManagerOverrideRestrictions
    canReportingManagerAllocateLeaveCredit
    isLeaveApprovalRequired
    leaveStructureId: number;
    leaveComponentId: number;
  }