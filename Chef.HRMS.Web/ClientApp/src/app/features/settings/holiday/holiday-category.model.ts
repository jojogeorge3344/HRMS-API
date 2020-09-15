import { Model } from '@shared/models/model';

export interface HolidayCategory extends Model {
    name: string;
    year: string;
    isConfigured: boolean;
  }