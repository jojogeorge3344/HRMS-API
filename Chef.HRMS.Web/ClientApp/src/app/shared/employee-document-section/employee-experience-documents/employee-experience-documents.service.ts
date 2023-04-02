import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeExperienceDocument } from "./employee-experience-document.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeExperienceDocumentsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/previousEmploymentDocument/";
  }

  get(id: number) {
    return this.http.get<EmployeeExperienceDocument>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
  add(previousEmploymentDocument: EmployeeExperienceDocument) {
    return this.http.post<EmployeeExperienceDocument>(this.baseUrl + 'insert', previousEmploymentDocument).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeExperienceDocument>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
