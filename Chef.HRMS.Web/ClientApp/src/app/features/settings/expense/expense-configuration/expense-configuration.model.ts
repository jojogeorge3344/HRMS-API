import { Model } from '@shared/models/model';

export interface ExpenseConfiguration extends Model {
    category: number;
    expenseTypeId: number;
    expensePolicyId: number;
    name: string;
    code: string;
    expensePolicyName: string;
    currency: string;    
    isExpenseLimitEnabled: boolean;
    maximumExpenseLimit: number;
    expensePeriodType: number;
    isInstanceLimitEnabled: boolean;
    maximumInstancesLimit: number;
    instancesPeriodType: number;
    isExpiryMarked: boolean;
    daysPassed: number;
    isCommentRequired: boolean;
    maximumLimitComment: number;
    isReceiptRequired: boolean;
    maximumLimitReceipt: number;
    mileageUnit: number;
    mileageRate: number;
    isProofRequired: boolean;    
    isConfigured: boolean
  }