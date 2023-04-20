import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EmployeeIdentityDetails } from "./employee-identity-details.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeIdentityDetailsService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/employeeDocument/";
  }

  add(identityDetails: EmployeeIdentityDetails) {
    return this.http
      .post<EmployeeIdentityDetails>(this.baseUrl + "insert", identityDetails)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getAll() {
    return this.http.get<EmployeeIdentityDetails>(this.baseUrl + "getAll").pipe(
      map((response) => {
        return response;
      })
    );
  }

  getEmployeeId(id: number) {
    return this.http.get<EmployeeIdentityDetails>(
      this.baseUrl + "getEmployeeId/" + id
    );
  }

  getAllByEmployeeId(id: number, docId: number) {
    return this.http.get<EmployeeIdentityDetails>(
      this.baseUrl + "getAllByEmployeeId/" + id + "/" + docId
    );
  }

  update(identityDetails: EmployeeIdentityDetails) {
    return this.http
      .post<EmployeeIdentityDetails>(this.baseUrl + "update", identityDetails)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<EmployeeIdentityDetails>(this.baseUrl + "delete/" + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  isDocumentCodeExist(documentNumber: string) {
    return this.http.get<boolean>(
      this.baseUrl + "IsDocumentCodeExist/" + documentNumber
    );
  }
  getAllActiveDocumentsTypes(){
    return this.http.get<any>(this.baseUrl + "getAllActiveDocumentsTypes").pipe(
      map((response) => {
        return response;
      })
    );
  }
}

