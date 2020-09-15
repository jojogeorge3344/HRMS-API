import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollReview } from './payroll-process-preview.model';
import { mergeMap, groupBy, zip, toArray, map } from 'rxjs/operators';
import { GroupedObservable, Observable, of, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessPreviewServiceService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payrollprocessing/PayrollProcessingMethod/";
  }

  add(payrollReview: PayrollReview) {
    return this.http.post<PayrollReview>(this.baseUrl + 'insert', payrollReview).pipe(map(response => { return response; }));
  }

  getAllPayrollReview(payrollProcessingMethodId: number) {
    return this.http.get<PayrollReview[]>(this.baseUrl + 'GetAllPayrollReviewByProcessingMethodId/' + payrollProcessingMethodId).pipe(map(response => { return response; }));
  }

  getPayBreakUp(id: number, payrollProcessingMethodId: number) {
    return this.http.get<PayrollReview[]>(this.baseUrl + 'GetPayBreakUpByEmployeeId' + '/' + id + '/' + payrollProcessingMethodId).pipe(map(response => { return response; }));
  }
  getEmployeeBreakup(employeeId: number, payrollProcessingMethodId: number) {
    return this.http.get(this.baseUrl + 'GetPayBreakUpByEmployeeId' + '/' + employeeId + '/' + payrollProcessingMethodId)
      .pipe(
        map((res: any[]) => res.map(comp => {
          let displayGroup = comp.type;
          if (comp.type === 'ALR') {
            displayGroup = 'Bonus';
          }
          if (comp.type === 'ALRP') {
            displayGroup = 'Adhoc';
          }
          return {
            ...comp,
            group: displayGroup,
          };
        })),
        mergeMap((res: any) => res),
        groupBy((component: any) => component.group),
        mergeMap((group: GroupedObservable<string, Observable<any>>) =>
          // zip(of(group.key), group.pipe(toArray()))
          combineLatest(of(group.key), group.pipe(toArray()))

        ),
        map(arr => (
          { type: arr[0], values: arr[1] })),
        toArray(),
      );

  }
  update(payrollReview: PayrollReview) {
    return this.http.post<PayrollReview>(this.baseUrl + 'update', payrollReview).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<PayrollReview>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

}
