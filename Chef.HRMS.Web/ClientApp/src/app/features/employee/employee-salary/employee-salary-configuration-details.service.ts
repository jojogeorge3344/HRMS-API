import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeSalaryConfigurationDetails } from './employee-salary-configuration-details.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSalaryConfigurationDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/employeeSalaryConfigurationDetails/";
  }

  insert(employeeSalaryConfigurationDetails: EmployeeSalaryConfigurationDetails[]) {
    return this.http.post<EmployeeSalaryConfigurationDetails>(this.baseUrl + 'insertEmployeeSalaryConfigDetails', employeeSalaryConfigurationDetails).pipe(map(response => { return response; }));
  }

  update(employeeSalaryConfigurationDetails: EmployeeSalaryConfigurationDetails[]) {
    return this.http.put(this.baseUrl + 'updateEmployeeSalaryConfigDetails', employeeSalaryConfigurationDetails).pipe(map(response => { return response; }));
  }
  
  delete(employeeId: number) {
    return this.http.delete(this.baseUrl + 'deleteByEmployeeId/' + employeeId).pipe(map(response => { return response; }));
  }
}
