import { Model } from '@shared/models/model';

export interface EmployeeAddressDetails extends Model {
    employeeId: number;
    currentAddressLine1: string;
    currentAddressLine2: string;
    currentCountry: number
    currentState: number
    currentPinCode: string;
    permanentAddressLine1: string;
    permanentAddressLine2: string;
    permanentCountry: number
    permanentState: number
    permanentPinCode: string;
} 