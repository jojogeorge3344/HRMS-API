import { Model } from '@shared/models/model';

export interface EosSlabGroup extends Model {
      eosId:number,
      bfCode: string,
      bfName: string,
      lowerLimit:number,
      upperLimit:number,
      valueVariable:number,
      valueType:string
}