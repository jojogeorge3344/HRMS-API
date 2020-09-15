import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeePassportDocument } from "./employee-passport-document.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeePassportDocumentService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/passportdocument/";
  }

  get(id) {
    return this.http.get<EmployeePassportDocument>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
  add(passportDocument: EmployeePassportDocument) {
    return this.http.post<EmployeePassportDocument>(this.baseUrl + 'insert', passportDocument).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeePassportDocument>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
