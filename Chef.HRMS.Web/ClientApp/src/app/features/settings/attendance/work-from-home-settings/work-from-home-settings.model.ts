import { Model } from '@shared/models/model';

export interface WorkFromHomeSettings extends Model {
    isEnabled: boolean;
    approvalWorkflowId: number;
    isLimited: boolean;
    maximumLimit: number;
    periodType: number;
    priorDays: number;
    subsequentDays: number;
}