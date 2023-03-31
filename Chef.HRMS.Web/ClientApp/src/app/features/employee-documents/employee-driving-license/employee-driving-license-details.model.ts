import { EmployeeIdentityDocument } from "@shared/employee-document-section/employee-identity-documents/employee-identity-document.model";

export interface EmployeeDrivingLicenseDetails
  extends EmployeeIdentityDocument {
  address: string;
  dateOfExpiry: Date;
}
