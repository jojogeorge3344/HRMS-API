import { Model } from "@shared/models/model";

export interface EmployeeIdentityDetails extends Model {
  employeeId: number;
  documentId: number;
  documentType: string;
  documentNumber: number;
  issueDate: Date;
  placeOfIssue: string;
  expiryDate: Date;
  remarks: string;
  refNum: Number;
  name: string;
  code: string;
  isExpired: boolean;
  expiryBeforeDays: number;
  displayOrder: number;
  documentReturnType: number;
  documentUpdateType: number;
  active: boolean;
  documentTypeList: number;
  documentTypeMasterId: number;
}
