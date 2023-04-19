import { Model } from '@shared/models/model';

export interface LeaveSlabGroup extends Model {
      leaveComponentId: number,
      leaveComponentName: string,
      leaveComponentCode:string,
      lowerLimit:number,
      upperLimit:number,
      valueVariable:number,
      valueType:any;
      id:any
}