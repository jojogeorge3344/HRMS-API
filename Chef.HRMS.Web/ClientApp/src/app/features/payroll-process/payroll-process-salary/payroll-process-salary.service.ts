import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, groupBy, toArray, map, distinct } from 'rxjs/operators';
import { GroupedObservable, Observable, zip, of } from 'rxjs';
import { PayrollBasicComponent } from './payroll-process-salary.model';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessSalaryService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/settings/payrollprocessing/PayrollBasicComponent/';
  }

  getAll(payGroupId, month, year) {
    return this.http.get<{ id: number, values: PayrollBasicComponent[] }[]>(this.baseUrl + 'GetBasicComponentsByPaygroup/' + payGroupId + '/' + year + '/' + month)
      .pipe(
        map((res: any[]) => res.map(comp => {
          comp[comp.shortCode] = comp.monthlyAmount;
          return comp;
        })),
        mergeMap((res: any) => res),
        groupBy((component: any) => component.employeeId,),
        mergeMap((group: GroupedObservable<string, Observable<any>>) =>
          zip(of(group.key), group.pipe(toArray()))),
        map(arr => (
          { id: arr[0], values: arr[1] })),
        toArray(),
      );

  }
  getByProcessId(processId) {
    return this.http.get<{ id: number, values: PayrollBasicComponent[] }[]>(this.baseUrl + 'GetPayrollBasicComponentByPayrollProcessingMethodId/' + processId)
      .pipe(
        map((res: any[]) => res.map(comp => {
          comp[comp.shortCode] = comp.monthlyAmount;
          return comp;
        })),
        mergeMap((res: any) => res),
        groupBy((component: any) => component.employeeId,),
        mergeMap((group: GroupedObservable<string, Observable<any>>) =>
          zip(of(group.key), group.pipe(toArray()))),
        map(arr => (
          { id: arr[0], values: arr[1] })),
        toArray(),
      );

  }
  getEmployeeSalaryByProcessId(processId) {
    return this.http.get<{ id: number, values: PayrollBasicComponent[] }[]>(this.baseUrl + 'GetPayrollBasicComponentByPayrollProcessingMethodId/' + processId)
      .pipe(
      );

  }
  getByEmployee(employeeId) {
    return this.http.get<any[]>(this.baseUrl + 'GetPayrollBasicComponentByEmployeeId/' + employeeId).pipe(map(response => { return response; }));
  }
  update(basicComponents) {
    return this.http.post<any[]>(this.baseUrl + 'InsertPayrollBasicComponents/', basicComponents).pipe(map(response => { return response; }));
  }
}
