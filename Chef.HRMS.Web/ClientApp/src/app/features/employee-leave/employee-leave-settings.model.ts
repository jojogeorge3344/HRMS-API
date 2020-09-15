import { Model } from '@shared/models/model';

export interface EmployeeLeaveSettingsViewModel extends Model {
    leaveComponentId: number;
    leaveStructureId: number;
    maxConsecutiveDays: number;
    maxNumberOfDaysPerMonth: number;
    numberOfDaysGapRequiredBetweenLeaves: number;
    noLeaveQuotaAfterJoiningDay: number;
    priorNoticeDays: number;
    canApplyHalfDay:boolean;
    canEmployeeApplyLeave:boolean;
    canApplyLeaveDuringNoticePeriod:boolean;
    canApplyLeaveDuringProbation:boolean;
    canApplyForFutureDate:boolean; 
    isLeaveApprovalRequired:boolean;
    dateOfJoin:Date; 
    probationPeriod:number; 
    periodType: number;
    noticePeriod: number;
  }