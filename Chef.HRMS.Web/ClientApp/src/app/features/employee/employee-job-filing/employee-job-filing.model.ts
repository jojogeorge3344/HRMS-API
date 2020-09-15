import { Model } from '@shared/models/model';

export interface EmployeeJobFilings extends Model {
    payrollStructureId: number; 
    employeeId:number;
    leaveStructureId  :number;
    shift :number;
    weekOff :number;
    holidayCategoryId :number;
    overTimePolicyId: number;
    attendanceTracking :number;
    expensePolicy :number;
    attendanceCaptureScheme :number;
    skipOnBoarding: boolean;
    onBoardingFlow :number;
    canUserManageProfile: boolean;
    payGroupId:number;
    paymentMode:number;
}