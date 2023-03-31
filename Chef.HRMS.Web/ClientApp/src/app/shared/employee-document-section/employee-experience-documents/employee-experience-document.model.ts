import { Model } from '@shared/models/model';

export interface EmployeeExperienceDocument extends Model {
    previousEmploymentId: number;
    documentId: number;
}