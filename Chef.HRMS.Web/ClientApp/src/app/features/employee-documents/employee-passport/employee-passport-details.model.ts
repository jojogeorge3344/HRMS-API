import { EmployeeIdentityDocument } from '../employee-identity-document.model';

export interface EmployeePassportDetails extends EmployeeIdentityDocument {
    address: string;
    dateOfExpiry: Date;
    dateOfIssue: Date;
    givenName: string;
    motherName: string;
    nationality: string;
    placeOfBirth: string;
    placeOfIssue: string;
    surName: string;
}