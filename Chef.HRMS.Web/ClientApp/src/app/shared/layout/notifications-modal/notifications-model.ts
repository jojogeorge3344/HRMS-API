import { Model } from '@shared/models/model';

export interface Notifications extends Model {
    pendingRequest: number;
    employeeId: number;
    notificationType: string;
}
