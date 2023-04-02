import { Model } from '@shared/models/model';

export interface EosSlabGroup extends Model {
      bfCode: string,
      bfName: string,
      lowerLimit:number,
      upperLimit:number,
      valueVariable:number,
      valueType:string
}