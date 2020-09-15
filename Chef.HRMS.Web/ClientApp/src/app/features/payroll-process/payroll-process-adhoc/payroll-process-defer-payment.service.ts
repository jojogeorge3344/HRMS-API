import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeferPayment } from './payroll-process-loan-defer-payment.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessDeferPaymentService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/Repayment/DeferPayment/";
  }

  add(deferPayment: DeferPayment){
    return this.http.post<DeferPayment>(this.baseUrl + 'insert', deferPayment).pipe(map(response => { return response; }));
  }

  // getAll(){
  //   return this.http.get<DeferPayment>(this.baseUrl + 'GetAll');
  // }

  // update(deferPayment: DeferPayment){
  // return this.http.post<DeferPayment>(this.baseUrl + 'update', deferPayment);
  // }

  // delete(id:number){
  //   return this.http.delete<DeferPayment>(this.baseUrl + 'delete/'+id);
  // }
}
