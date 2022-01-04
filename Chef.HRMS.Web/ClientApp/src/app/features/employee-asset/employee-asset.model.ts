import { Model } from '@shared/models/model';

export interface AssetEmployeeWise extends Model {  
    employeeID :number;
    firstName :string;
    lastName  :string;
    employeeStatus :string;
    allocatedAsset :number;
    requests :number;
  }