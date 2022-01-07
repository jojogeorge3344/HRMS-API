import { Model } from '@shared/models/model';

export interface AllocatedAssets extends Model {  
    assetRaiseRequestId :number;
    requestNo :number;
    requestFor : number;
    requestType :string;
    status :string;
    requestedOn:Date;
    requestedBy :string;
  }