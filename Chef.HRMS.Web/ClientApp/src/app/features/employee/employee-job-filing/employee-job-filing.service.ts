import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeJobFilings } from './employee-job-filing.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeJobFilingService {

  public baseUrl: string;
  public http: HttpClient;
  eosUrl:string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/jobfiling/";
    this.eosUrl=baseUrl+ "api/EndOfService/"

  }

  add(jobFilings: EmployeeJobFilings) {
    return this.http.post<EmployeeJobFilings>(this.baseUrl + 'insert', jobFilings).pipe(map(response => { return response; }));
  }
  getEosType() {
    return this.http.get<any>(this.eosUrl + 'getAll').pipe(map(response => { return response; }));
  }
  
  getAll() {
    return this.http.get<EmployeeJobFilings>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  update(jobFilings: EmployeeJobFilings) {
    return this.http.post<EmployeeJobFilings>(this.baseUrl + 'update', jobFilings).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeJobFilings>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeJobFilings>(this.baseUrl + 'get/' + id)
      .pipe(
        map(jobFilling => {
          return {
            ...jobFilling,
            overTimePolicyId: jobFilling.overTimePolicyId === 0 ? '' : jobFilling.overTimePolicyId,
            payGroupId: jobFilling.payGroupId === 0 ? '' : jobFilling.payGroupId,
            paymentMode: jobFilling.paymentMode === 0 ? 1 : jobFilling.paymentMode,
            payrollStructureId: jobFilling.payrollStructureId === 0 ? '' : jobFilling.payrollStructureId
          }
        })
      );
  }
  getWeekendPolicyById(id) {
    return this.http.get<number>(this.baseUrl + 'getWeekendPolicyById/' + id).pipe(map(response => { return response; }));
  }
  

}
