import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenerateAccrualsService {
  public baseUrl: string;
  public http: HttpClient;
  public getAccrualsListUrl:string
  public getLeaveAccruals:string
  public getEOSAccrual:string
  public getticketaccrual:string
  public saveAccrualDetails:string
  public generateFinacialEntry:string
 
  constructor(
    http: HttpClient, @Inject('BASE_URL') baseUrl: string
  ) {
    this.http = http;
    this.getAccrualsListUrl = baseUrl + 'api/settings/payrollprocessing/PayrollProcessingMethod/'
    this.getLeaveAccruals = baseUrl + 'api/settings/payrollprocessing/LeaveAccrual/'
    this.getEOSAccrual = baseUrl + 'api/settings/payrollprocessing/EOSAccrual/'
    this.getticketaccrual = baseUrl + 'api/settings/payrollprocessing/TicketAccrual/'
    this.saveAccrualDetails = baseUrl + 'api/settings/payrollprocessing/Accruals/SaveAccruals'
    this.generateFinacialEntry = baseUrl + 'api/settings/payrollprocessing/Accruals/'



   }

   getAccrualsList() {
    return this.http.get(this.getAccrualsListUrl + 'GetAllByProcessingStep/' + 5).pipe(map(response => { return response; }));
  }
  getLeaveAccrualsList(paygroupid) {
    return this.http.post(this.getLeaveAccruals + 'GenerateLeaveAccruals/' + paygroupid,'').pipe(map(response => { return response; }));
  }
  getEOSAccrualList(paygroupid) {
    return this.http.post(this.getEOSAccrual + 'GenerateEOSAccruals/' + paygroupid,'').pipe(map(response => { return response; }));
  }
  getticketaccrualList(paygroupid) {
    return this.http.post(this.getticketaccrual + 'GenerateTicketAccruals/' + paygroupid,'').pipe(map(response => { return response; }));
  }

  saveAccruals(accrualdetails){
    return this.http.post(this.saveAccrualDetails,accrualdetails).pipe(map(response => { return response; }));
  }
  gen_finacialEntry(paygroupid) {
    return this.http.post(this.generateFinacialEntry + 'GenerateFinancialEntry/' + paygroupid,'').pipe(map(response => { return response; }));
  }

  get_processedAccruals(payrollprocessid){
    return this.http.get(this.generateFinacialEntry + 'GetProcessedAccruals/' + payrollprocessid).pipe(map(response => { return response; }));
  }
}
