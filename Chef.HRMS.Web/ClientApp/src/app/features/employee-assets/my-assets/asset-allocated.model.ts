import { Model } from '@shared/models/model';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

export interface AssetAllocated extends Model {
    allocationId: string;
    assetTypeId:number;
    // assetMyAssetId:number;
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
    assetTypeName: string;
    allocationTo: string;
    allocatorComments: string;
}
