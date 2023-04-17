import { Model } from '@shared/models/model';

export interface ReligionGroup extends Model {
    name: string;
    code: string;
    status:boolean
}