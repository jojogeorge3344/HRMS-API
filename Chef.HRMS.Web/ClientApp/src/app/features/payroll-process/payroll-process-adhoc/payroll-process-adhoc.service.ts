import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdhocDeduction } from './payroll-process-adhoc-deduction.model';
import { AdhocDeductionView } from './payroll-process-adhoc-deduction-view.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessAdhocService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/Deduction/AdhocDeduction/";
  }

  // getAllAdhocDeduction(id, month, year) {
  //   return this.http.get<AdhocDeductionView[]>(this.baseUrl + 'GetAllAdhocDeductionByPayrollProcessingMethodId/' + id + '/' + year + '/' + month)
  //     .pipe(map(response => { return response; }));
  // }
  getAllAdhocDeduction(id, from, to) {
    return this.http.get<AdhocDeductionView[]>(this.baseUrl + 'GetAllAdhocDeductionByPayrollProcessingMethodId?payGroupId=' + id + '&fromDate=' + from + '&toDate=' + to)
      .pipe(map(response => { return response; }));
  }
  getEmployeeAllAdhocDeduction(id)
  {
    return this.http.get<AdhocDeductionView[]>(this.baseUrl + 'GetEmployeeAdhocDeductionByPayrollProcessingMethodId/' + id)
    .pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<AdhocDeduction>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(adhocDeduction: AdhocDeduction) {
    return this.http.post<AdhocDeduction>(this.baseUrl + 'insert', adhocDeduction).pipe(map(response => { return response; }));
  }

  getAll() {
    return this.http.get<AdhocDeduction>(this.baseUrl + 'GetAll').pipe(map(response => { return response; }));
  }

  update(adhocDeduction: AdhocDeduction) {
    return this.http.put<AdhocDeduction>(this.baseUrl + 'update', adhocDeduction).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<AdhocDeduction>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

}
