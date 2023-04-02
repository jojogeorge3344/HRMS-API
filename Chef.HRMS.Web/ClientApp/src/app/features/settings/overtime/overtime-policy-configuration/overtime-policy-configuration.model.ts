export interface OvertimePolicyConfiguration {
    overTimePolicyId: number;
    overtimePolicyName: string;
    isApprovalRequired: boolean;
    noticeDays: number;
    maximumLimit: number;
    periodType: number;
    isCommentRequired: boolean;
    isPastDayRQPossible: boolean;
    maximumPastDayLimit: number;
    lastDayLimit: number;
    isRoundOffRequired: boolean;
    isRoundOffNearest: boolean;
    isRoundOffLowest: boolean;
    normalFormula: string;
    holidayFormula: string;
    specialFormula: string;
    minimumOverTimeHour: number;
    timeBeyondShiftHour: number;
    normalOverTime8:number;
    holidayOvertime9:number;
    specialOvertime10:number;
}