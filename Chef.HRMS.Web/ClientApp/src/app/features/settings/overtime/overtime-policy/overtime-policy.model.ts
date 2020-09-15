import { Model } from '@shared/models/model';

export interface OvertimePolicy extends Model {
    name: string;
    description: string;
    numberOfEmployees: number;
    attendanceHoursType: number;
    isConfigured: boolean;
}