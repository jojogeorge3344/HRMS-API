import { Model } from '@shared/models/model';

export interface WpsUser extends Model {
    groupId: number;
    employeeId: number;
    wpsId: number;
}