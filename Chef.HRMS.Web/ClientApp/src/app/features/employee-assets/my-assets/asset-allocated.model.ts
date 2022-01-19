import { Model } from '@shared/models/model';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

export interface AssetAllocated extends Model {
    assetTypeId:number;
    assetTypeName:string;
    assetRaiseRequestId:number;
    assetId:number;
    assetMetadataValueId:number;
    metadataValueId2:number;
    metadataValueId3:number;
    metadataValueId4:number;
    MetadataValueId5:number;
    empId:number;
    assetName:string;
    allocatedDate:Date;
    status:AssetStatus;
    description:string;
}
