import { Model } from '@shared/models/model';
import { RequestFor } from 'src/app/models/common/types/requestfor';
import { RequestType } from 'src/app/models/common/types/requesttype';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import * as internal from 'stream';

export interface AssetRaiseRequest extends Model {
    requestNo: string;
    requestedDate: Date;
    requestFor: RequestFor;
    requestType: RequestType;
    assetTypeId: number;
    status:AssetStatus;
    nameOfTeamMemberId: number;
    nameOfTeamMember: string;
    name: string;
    description: string;
    empId: number;
    requestedBy: string;
    assetid:number;
  }
