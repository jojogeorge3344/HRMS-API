import { Model } from '@shared/models/model';

export interface PayrollConfiguration extends Model {
  claimFrequency: number;
  claimLimit: number;
  description: string;
  isCustomizedAndOverridenAtEmployeeLevel: boolean;
  isDifferenceAmountAdjustable: boolean;
  isLossOfPayAffected: boolean;
  isPaidSeparately: boolean;
  isPartOfArrearCalculation: boolean;
  isPartOfEarningsAndDeductions: boolean;
  isPartOfLossOfPayCalculation: boolean;
  isProofRequired: boolean;
  isRecurring: boolean;
  isVisibleInPayslip: boolean;
  maximumLimit: number;
  name: string;
  payoutPattern: number;
  payrollComponentType: number;
  payrollComponentId: number;
  payrollStructureId: number;
  shortCode: string;
  isComputed: boolean;
  formula: string;
  isConfigured: boolean;
  categoryId:number
}