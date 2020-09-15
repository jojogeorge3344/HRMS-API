import { Model } from '@shared/models/model';

export interface EmployeeContactDetails extends Model {
    employeeId: number;
    emergencyContactName: string;
    emergencyContactNumber: string;
    emergencyContactCode: string;
    homePhone: string;
    homePhoneCode: string;
    mobile: string;
    mobileCode: string;
    personalEmail: string;
    skype: string;
    workEmail: string;
    workPhone: string;
    workPhoneCode: string
}