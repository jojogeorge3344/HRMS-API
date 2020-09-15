import { Model } from "@shared/models/model";

export interface ExpenseDocument extends Model {
    expenseId: number;
    documentId: number;
}