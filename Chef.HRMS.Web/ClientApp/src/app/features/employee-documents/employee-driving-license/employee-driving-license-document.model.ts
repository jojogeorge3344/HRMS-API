import { Model } from '@shared/models/model';

export interface EmployeeDrivingLicenseDocument extends Model {
    drivingLicenseId: number;
    documentId: number;
}