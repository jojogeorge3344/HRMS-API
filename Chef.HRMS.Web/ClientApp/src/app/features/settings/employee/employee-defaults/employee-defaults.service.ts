import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeDefaults } from './employee-defaults.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDefaultsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/EmployeeDefault/";
  }

  getAll(){
    return this.http.get<EmployeeDefaults>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeDefaults>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
  update(employeeDefaults: EmployeeDefaults){
    return this.http.post<EmployeeDefaults>(this.baseUrl + 'update', employeeDefaults).pipe(map(response => { return response; }));
  }
    
}

