import { Model } from '@shared/models/model';

export interface PayGroup extends Model {
    id: number;
    name: string;
    code: string;
    payrollCalendarId: number;
    startingYear: number;
    startingMonth: number;
    startingWeek: number;
}
