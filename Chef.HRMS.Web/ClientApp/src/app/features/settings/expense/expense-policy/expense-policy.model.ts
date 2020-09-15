import { Model } from '@shared/models/model';

export interface ExpensePolicy extends Model {
    name: string;
    currency: string;
    description: string;
    isConfigured: boolean;
  }
  