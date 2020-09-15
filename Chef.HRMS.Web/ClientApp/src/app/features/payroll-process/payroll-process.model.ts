import { Model } from '@shared/models/model';

export interface PayrollProcess extends Model {
    name: string;
    month: number;
    year: number;
    modeOfProcessing: number;
    payGroupId: number;
    employeeId: number;
    payGroupOrEmployeeName: string;
    status: string;
    processedStep: number;
  }
  