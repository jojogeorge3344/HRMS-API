import { Model } from '@shared/models/model';

export interface PayrollCalendar extends Model {
    id: number
    name:string,
    periodType:number,
    startsFrom:number,
    processingDay:number
}