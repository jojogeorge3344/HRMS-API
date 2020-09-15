import { Model } from '@shared/models/model';

export interface Bank extends Model {
  branchId: number;
  corporateId: string;
  accountNumber: string;
  accountName: string;
  branchName: string;
  ifscCode: string;
  bankName: string;
}