import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeePANCardDocument } from './employee-pan-card-document.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeePANCardDocumentService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/pandocument/";
  }

  get(id) {
    return this.http.get<EmployeePANCardDocument>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
  add(panCardDocument: EmployeePANCardDocument) {
    return this.http.post<EmployeePANCardDocument>(this.baseUrl + 'insert', panCardDocument).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeePANCardDocument>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
