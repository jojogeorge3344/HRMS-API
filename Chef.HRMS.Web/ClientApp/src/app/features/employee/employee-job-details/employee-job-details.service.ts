import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeJobDetails } from "./employee-job-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeJobDetailsService {

  public baseUrl: string;
  public http: HttpClient;
  public apiUrl:string;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/jobdetails/";
    this.apiUrl=baseUrl + "api/visaDesignation/"
  }

  add(jobDetails: EmployeeJobDetails){
    return this.http.post<EmployeeJobDetails>(this.baseUrl + 'insert', jobDetails).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<EmployeeJobDetails>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  update(jobDetails: EmployeeJobDetails){  
    return this.http.post<EmployeeJobDetails>(this.baseUrl + 'update', jobDetails).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<EmployeeJobDetails>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeJobDetails>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  getCategory() {
    return this.http.get<EmployeeJobDetails>(this.baseUrl + 'getGroupCategory' ).pipe(map(response => { return response; }));
  }

  getVisaDesignation() {
    return this.http.get<EmployeeJobDetails>(this.apiUrl + 'getAll' ).pipe(map(response => { return response; }));
  }

}


