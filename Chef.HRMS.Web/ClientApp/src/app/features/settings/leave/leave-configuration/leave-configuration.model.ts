import { Model } from '@shared/models/model';

export interface LeaveConfiguration extends Model {
    leaveStructureId: number;
    leaveComponentId: number;
    isConfigured?: boolean;
    eligibleDays:number;
    eligibilityBase:number
    maxLeaveAtaTime:number
  }
  