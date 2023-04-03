import { Model } from '@shared/models/model';

export interface UserVariableGroup extends Model {
    name: string;
    code: string;
    type:string;
    status:boolean
}