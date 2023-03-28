import { Model } from '@shared/models/model';

export interface WpsUser extends Model {
    groupId: number;
    employeeId: number;
    wpsId: string;
    molId:any;
    routingId:any;
    salaryCardNo:any;
    bankName:any;
    accountNo:any
}