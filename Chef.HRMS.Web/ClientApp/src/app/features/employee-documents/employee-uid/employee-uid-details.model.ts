import { EmployeeIdentityDocument } from '../employee-identity-document.model';

export interface EmployeeUIDDetails extends EmployeeIdentityDocument {
    address: string;
}