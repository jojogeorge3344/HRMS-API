import { Model } from '@shared/models/model';

export interface EmployeeUIDDocument extends Model {
    uniqueIdentificationDetailId: number;
    documentId: number;
}