import { EmployeeIdentityDocument } from "@shared/employee-document-section/employee-identity-documents/employee-identity-document.model";

export interface EmployeeUIDDetails extends EmployeeIdentityDocument {
  address: string;
}
