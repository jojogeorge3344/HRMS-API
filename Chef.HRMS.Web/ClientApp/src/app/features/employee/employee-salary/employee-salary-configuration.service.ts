import { EmployeeSalaryConfigurationView } from './employee-salary-configuration-view.model';
import { EmployeeSalaryConfiguration } from './employee-salary-configuration.model';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSalaryConfigurationService {

  public baseUrl: string;
  public http: HttpClient;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/settings/EmployeeSalaryConfiguration/';
   }

   insert(employeeSalaryConfiguration: EmployeeSalaryConfiguration) {
    return this.http.post<EmployeeSalaryConfiguration>(this.baseUrl + 'insert/', employeeSalaryConfiguration).pipe(map(response => { return response; }));
  }

  update(employeeSalaryConfiguration: EmployeeSalaryConfiguration) {
    return this.http.put<number>(this.baseUrl + 'update', employeeSalaryConfiguration).pipe(map(response => { return response; }));
  }

  getSalaryConfigurationByEmployee(employeeId: number) {
    return this.http.get<EmployeeSalaryConfigurationView[]>(this.baseUrl + 'getSalaryConfigurationByEmployeeId/' + employeeId)
      .pipe(
        map(things => things.sort(this.compareFn))
      );
  }

  delete(employeeId: number) {
    return this.http.delete<number>(this.baseUrl + 'deleteByEmployeeId/' + employeeId).pipe(map(response => { return response; }));
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
