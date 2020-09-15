import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeEducationalDetails } from './employee-educational-details.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEducationalDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/education/";
  }

  add(educationDetails: EmployeeEducationalDetails){
    return this.http.post<EmployeeEducationalDetails>(this.baseUrl + 'insert', educationDetails).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<EmployeeEducationalDetails>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  update(educationDetails: EmployeeEducationalDetails){
  return this.http.post<EmployeeEducationalDetails>(this.baseUrl + 'update', educationDetails).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<EmployeeEducationalDetails>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id:number) {
    return this.http.get<EmployeeEducationalDetails>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getByEmployeeId(id:number) {
    return this.http.get<EmployeeEducationalDetails>(this.baseUrl + 'GetAllByEmployeeId/' + id);
  }

}
