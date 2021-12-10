import { Model } from '@shared/models/model';

export interface EmployeeJobTitle extends Model {
    name: string;
    description: string;
    numberOfEmployees?: number;
  }