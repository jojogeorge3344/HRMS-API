import { Model } from '@shared/models/model';

export interface DocumentType extends Model {
    name: string;
    code: string;
    documentType:string;
    isExpired:boolean;
    expireBeforeDays:number;
    documentReturnBy:string;
    documentUpdateBy:string;
    status:boolean
}