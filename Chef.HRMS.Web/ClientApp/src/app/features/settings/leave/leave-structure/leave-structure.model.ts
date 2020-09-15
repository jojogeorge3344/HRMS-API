import { Model } from '@shared/models/model';

export interface LeaveStructure extends Model {
    id: number;
    name: string;
    description: string;
    calendarYearStartDate: Date;
    showLeavePolicyExplanation: boolean;
    isCustomLeavePolicyDocumentAvailable: boolean;
    customDocumentPath: string;
    isConfigured: boolean;
  }
  