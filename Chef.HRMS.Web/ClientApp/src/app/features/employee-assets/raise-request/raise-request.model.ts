import { Model } from '@shared/models/model';

export interface RaiseRequest extends Model {
    requesttype: string;
    requestdate: string;
    requestname: string;
    requestfor: string;
    nameofmember: string;
    assettype: string;
    description: string;
  }