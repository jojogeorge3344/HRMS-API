import { Model } from '@shared/models/model';

export interface EmployeeTicketGroup extends Model {
      travelFrom: string,
      travelTo: string,
      roundTrip:boolean,
      ticketAmount:number,
      
}