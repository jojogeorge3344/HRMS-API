import { EmployeeIdentityDocument } from '../employee-identity-documents-container/model/employee-identity-document.model';

export interface EmployeeUIDDetails extends EmployeeIdentityDocument {
    address: string;
}