import { Model } from '@shared/models/model';

export interface ExpenseType extends Model {
    name: string;
    category: number;
    code: string;
    description: string;
}