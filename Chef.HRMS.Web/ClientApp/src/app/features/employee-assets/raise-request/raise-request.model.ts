import { Model } from '@shared/models/model';
import { RequestFor } from 'src/app/models/common/types/requestfor';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

export interface AssetRaiseRequest extends Model {
    requestNo: string;
    requestedDate: Date;
    requestFor: RequestFor;
    requestType: string;
    assetTypeId: number;
    status:AssetStatus;
    nameOfTeamMemberId: number;
    nameOfTeamMember: string;
    name: string;
    description: string;
    empId: number;
    assetTypeName: string;
    requestedBy: string;
  }
