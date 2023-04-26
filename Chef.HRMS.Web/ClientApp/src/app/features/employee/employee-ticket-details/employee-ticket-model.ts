import { Model } from '@shared/models/model';

export interface EmployeeTicketGroup extends Model {
      travelFrom: string,
      travelTo: string,
      isRoundTrip:boolean,
      amount:number,
      travelMode:string
      travelDate:string
      employeeId:number
}