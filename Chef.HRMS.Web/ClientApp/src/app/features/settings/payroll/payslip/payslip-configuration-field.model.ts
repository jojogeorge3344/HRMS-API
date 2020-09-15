import { Model } from '@shared/models/model';

export interface PayslipConfigurationField extends Model {
    name: string;
    id: number;
    orders: number;
    status: boolean;
}