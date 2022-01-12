import { Model } from '@shared/models/model';
import { RaiseRequestFor } from 'src/app/models/common/types/raiserequestfor';
import { RaiseRequestStatus } from 'src/app/models/common/types/raiserequeststatus';

export interface AssetRaiseRequest extends Model {
    requestNo: number;
    requestedDate: Date;
    requestFor: RaiseRequestFor;
    requestType: string;
    assetTypeId: number;
    status:RaiseRequestStatus;
    nameOfTeamMember: string;
    description: string;
    empId: number;
  }