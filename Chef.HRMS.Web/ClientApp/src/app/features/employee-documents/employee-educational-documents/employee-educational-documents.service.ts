import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeEducationalDocument } from "./employee-educational-document.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEducationalDocumentsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/educationdocument/";
  }

  get(id) {
    return this.http.get<EmployeeEducationalDocument>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
  add(educationDocument: EmployeeEducationalDocument) {
    return this.http.post<EmployeeEducationalDocument>(this.baseUrl + 'insert', educationDocument).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeEducationalDocument>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

}
