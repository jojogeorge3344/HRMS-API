import { Model } from '@shared/models/model';

export interface EmployeeRegularLogin extends Model {
    employeeId: number;
    checkInTime: Date;
    checkOutTime: Date;
    checkInComment: string;
    isRemoteLogin: boolean;
  }