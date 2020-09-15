import { Model } from '@shared/models/model';

export interface Holiday extends Model {
  name: string;
  description: string;
  date: string;
  isFloating: boolean;
  holidayCategoryId: number;
}
