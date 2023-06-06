import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/employee/";
  }

  add(employeeDetails: Employee) {
    return this.http.post<Employee>(this.baseUrl + 'insert', employeeDetails).pipe(map(response => { return response; }));
  }

  getAll() {
    return this.http.get<Employee[]>(this.baseUrl + 'getAllEmployeeDetails')
      .pipe(
        map((employees: Employee[]) => {
          return employees.map(employee => {
            return {
              ...employee,
              fullName: `${employee.firstName || ''} ${employee.middleName || ''} ${employee.lastName || ''}`.replace(/ +(?= )/g, ''),
              shortForm: `${employee.firstName.charAt(0).toUpperCase()}${employee.lastName.charAt(0).toUpperCase()}`
            }
          });
        })
      );
  }

  update(employeeDetails: Employee) {
    return this.http.post<Employee>(this.baseUrl + 'update', employeeDetails).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<Employee>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<Employee>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getDetails(id) {
    return this.http.get<Employee>(this.baseUrl + 'GetEmployeeDetailsById/' + id)
      .pipe
      (map(response => {
        return {
          ...response,
          fullName: `${response.firstName || ''} ${response.middleName || ''} ${response.lastName || ''}`.replace(/ +(?= )/g, ''),

        };
      }));
  }

  getEmployeeDetailsByJobTile(jobTitleId: number) {
    return this.http.get<Employee[]>(this.baseUrl + 'getEmployeeDetailsByJobTile/' + jobTitleId).pipe(map(response => { return response; }));
  }
  getName(name) {
    return this.http.get<Employee[]>(this.baseUrl + 'IsNameExist/' + name).pipe(map(response => { return response; }));
  }
  getLoginEmployee(id){
    return this.http.get<Employee[]>(this.baseUrl + 'GetLoginEmployee/' + id).pipe(map(response => { return response; }));
  }
  getDetailsByFile(id,leaveRowId) {
    return this.http.get<Employee>(this.baseUrl + 'GetEmployeeEditLeaveDetails/' + id + "/" + leaveRowId)
      .pipe
      (map(response => {
        return response
      }));
  }
}
