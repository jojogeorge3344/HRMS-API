import { Model } from '@shared/models/model';

export interface EmployeePassportDocument extends Model {
    passportId: number;
    documentId: number;
}