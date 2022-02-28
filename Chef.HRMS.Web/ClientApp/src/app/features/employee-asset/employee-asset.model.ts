import { Model } from '@shared/models/model';

export interface AssetEmployeeWise extends Model {  
    employeeID :number;
    firstName :string;
    lastName  :string;
    employeeStatus :WorkerType;
    employeeNumber :string;
    allocatedAsset :number;
    requests :number;
    designation:string;
  }