import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRevisionManagementService {

  public baseUrl: string;
  public http: HttpClient;
  public baseUrl_Details:string;
  public baseUrl_Details_old:string
  public baseUrl_old:string
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/EmployeeRevision/';
    this.baseUrl_Details = baseUrl + 'api/EmployeeRevisionDetails/'
    this.baseUrl_Details_old = baseUrl + 'api/EmployeeRevisionDetailsOld/'
    this.baseUrl_old =baseUrl + 'api/EmployeeRevisionOld/'

  }

  add(employeeRevision) {
    return this.http.post(this.baseUrl + 'insert', employeeRevision).pipe(map(response => { return response; }));
  }
  getAll() {
    return this.http.get(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }
  getEmployeeDetailsById(id:number) {
    return this.http.get(this.baseUrl + 'GetEmployeeDetail/' + id).pipe(map(response => { return response; }));
  }
  get(id:number){
    return this.http.get(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  update(employeeRevision){
    return this.http.post(this.baseUrl + 'update',employeeRevision).pipe(map(response => { return response; }));
  }
  delete(id:number){
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  getEmployeePayroll(id,employeeId){
      return this.http.get(this.baseUrl_Details + 'GetEmployeeRevisionSalaryDetails/' + id + '/' + employeeId).pipe(map(response => { return response; }));
  }
  save_oldSalaryDetails(oldSalary) {
    return this.http.post(this.baseUrl_Details_old + 'insert', oldSalary).pipe(map(response => { return response; }));
  }
  save_ReversedSalaryDetails(revSalary) {
    return this.http.post(this.baseUrl_Details + 'insert', revSalary).pipe(map(response => { return response; }));
  }
  update_oldSalaryDetails(oldSalary) {
    return this.http.post(this.baseUrl_Details_old + 'update', oldSalary).pipe(map(response => { return response; }));
  }
  update_ReversedSalaryDetails(revSalary) {
    return this.http.post(this.baseUrl_Details + 'update', revSalary).pipe(map(response => { return response; }));
  }
  process(id){
    return this.http.post(this.baseUrl + 'EmployeeRevisionProcess/',id).pipe(map(response => { return response; }));
  }

  get_oldSalaryDetails(id) {
    return this.http.get(this.baseUrl_Details_old + 'GetOldEmployeeRevisionSalaryDetail/' + id).pipe(map(response => { return response; }));
  }
  get_ReversedSalaryDetails(id) {
    return this.http.get(this.baseUrl_Details + 'GetEmployeeRevisionSalaryDetail/'+id).pipe(map(response => { return response; }));
  }

  getpayrollComponents(id){
    return this.http.get(this.baseUrl + 'GetPayrollStructureComponent/' + id ).pipe(map(response => { return response; }));
  }


  getOldDetails(id){
    return this.http.get(this.baseUrl_old + 'GetEmployeeRevisionOld/' + id).pipe(map(response => { return response; }));
  }
}
