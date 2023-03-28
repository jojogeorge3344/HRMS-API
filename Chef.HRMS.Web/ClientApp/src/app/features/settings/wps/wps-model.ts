import { Model } from '@shared/models/model';

export interface WpsGroup extends Model {
    groupCode: string;
    groupName: string;
    establishmentId: string;
    remarks: string;
    molId:any;
    routingId:any;
    salaryCardNo:any;
    bankName:any;
    accountNo:any
}