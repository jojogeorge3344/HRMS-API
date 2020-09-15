import { EmployeeIdentityDocument } from '../employee-identity-document.model';

export interface EmployeeDrivingLicenseDetails extends EmployeeIdentityDocument {
    address: string;
    dateOfExpiry: Date;
}