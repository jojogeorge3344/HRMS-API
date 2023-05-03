import { Model } from "@shared/models/model";

export interface EmployeeLeaveDocument extends Model {
  leaveId: number;
  documentId: number;
}
