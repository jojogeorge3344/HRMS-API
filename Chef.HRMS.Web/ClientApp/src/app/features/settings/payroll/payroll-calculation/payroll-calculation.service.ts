import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PayrollCalculation } from './payroll-calculation.model';
import { PayrollCalculationView } from './payroll-calculation-view.model';
import { EmployeeSalaryConfigurationView } from 'src/app/features/employee/employee-salary/employee-salary-configuration-view.model';
@Injectable({
  providedIn: 'root'
})
export class PayrollCalculationService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/settings/payroll/payrollcalculation/`;
  }

  get(id) {
    return this.http.get<PayrollCalculation>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getAll() {
    return this.http.get<PayrollCalculationView[]>(this.baseUrl + 'GetAllCalculationDetails').pipe(map(response => { return response; }));
  }

  add(payrollCalculation: PayrollCalculation) {
    return this.http.post<PayrollCalculation>(this.baseUrl + 'insert', payrollCalculation).pipe(map(response => { return response; }));
  }

  update(payrollCalculation: PayrollCalculation) {
    return this.http.post<PayrollCalculation>(this.baseUrl + 'update', payrollCalculation).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<PayrollCalculation>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  getByEmployeeId(id: number) {
    return this.http.get<EmployeeSalaryConfigurationView[]>(this.baseUrl + 'GetPayrollComponentsByEmployeeId/' + id)
      .pipe(
        map(components => components.map(x => {
          return {
            ...x,
            monthlyAmount: 0,
            yearlyAmount: 0,
          };
        })

        ),
        map(things => things.sort(this.compareFn)),
        
      );
  }
  compareFn = (a, b) => {
    if (b.formula && b.formula.indexOf(a.shortCode) !== -1) {
      return -1;
    }
    if (b.formula && b.formula.indexOf(a.shortCode) === -1) {
      return 1;
    }
    return 0;
  }

}
