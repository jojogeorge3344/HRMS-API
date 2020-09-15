import { Model } from '@shared/models/model';

export interface LeaveComponent extends Model {
    id: number;
    name: string;
    code: string;
    description: string;
    showLeaveDescription: boolean;
    isPaidLeave: boolean;
    isSickLeave: boolean;
    isStatutoryLeave: boolean;
    isRestrictedToGender: boolean;
    restrictedToGender: number;
    isRestrictedToMaritalStatus: boolean;
    restrictedToMaritalStatus: number;
  }