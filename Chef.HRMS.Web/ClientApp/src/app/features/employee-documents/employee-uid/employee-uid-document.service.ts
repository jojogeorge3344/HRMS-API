import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeUIDDocument } from "./employee-uid-document.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeUIDDocumentService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/uniqueIdentificationdocument/";
  }

  get(id) {
    return this.http.get<EmployeeUIDDocument>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
  add(uniqueIdentificationDocument: EmployeeUIDDocument) {
    return this.http.post<EmployeeUIDDocument>(this.baseUrl + 'insert', uniqueIdentificationDocument).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeUIDDocument>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
