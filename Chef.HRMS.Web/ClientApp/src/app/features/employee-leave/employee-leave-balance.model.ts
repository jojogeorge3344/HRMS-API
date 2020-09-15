import { Model } from '@shared/models/model';

export interface EmployeeLeaveBalance extends Model {
    leaveComponentId: number;
    leaveComponentName: string;
    leaveBalance: number;
    description: string;
    shortCode:string;
    calendaryearstartdate:Date;
    annualLeaveQuota: number;
    isRestrictedToGender: boolean;
    restrictedToGender: number;
    isRestrictedToMaritalStatus: boolean;
    restrictedToMaritalStatus: number;
    showDescription: boolean;
    gender: number;
    maritalStatus: number;
  }