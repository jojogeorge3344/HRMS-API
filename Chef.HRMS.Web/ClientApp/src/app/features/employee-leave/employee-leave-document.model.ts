import { Model } from "@shared/models/model";

export interface EmployeeLeaveDocument extends Model {
  educationId: number;
  documentId: number;
}
