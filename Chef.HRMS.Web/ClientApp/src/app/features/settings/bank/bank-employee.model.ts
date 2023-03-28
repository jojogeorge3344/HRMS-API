import { Model } from '@shared/models/model';

export interface BankGroup extends Model {
    name: string;
    code: string;
    status:boolean;
    address:string
}
