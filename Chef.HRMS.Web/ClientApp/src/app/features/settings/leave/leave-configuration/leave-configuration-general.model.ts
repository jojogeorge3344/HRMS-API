import { Model } from '@shared/models/model';

export interface LeaveConfigurationGeneral extends Model {
    annualLeaveQuota: number,
    maxConsecutiveDays: number,
    maxNumberOfDaysPerMonth: number,
    numberOfDaysGapRequiredBetweenLeaves: number,
    noLeaveQuotaAfterJoiningDay: number,
    priorNoticeDays: number,
    balanceRoundOff: number,
    leaveBalancesAtTheYearEnd: number,
    negativeLeaveBalancesAtTheYearEnd: number,
    allocateLeaveQuotaAt: number,
    maxCarryForwardDays: number,
    leaveStructureId: number;
    leaveComponentId: number;
    isConfigured: boolean;
  }