import { Model } from '@shared/models/model';

export interface EmployeePANCardDocument extends Model {
    panId: number;
    documentId: number;
}