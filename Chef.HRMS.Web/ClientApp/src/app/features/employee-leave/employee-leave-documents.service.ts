import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EmployeeLeaveDocument } from "./employee-leave-document.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeLeaveDocumentsService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/leaveDocument/";
  }

  get(id) {
    return this.http
      .get<EmployeeLeaveDocument>(this.baseUrl + "get/" + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  add(educationDocument: EmployeeLeaveDocument) {
    return this.http
      .post<EmployeeLeaveDocument>(this.baseUrl + "insert", educationDocument)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<EmployeeLeaveDocument>(this.baseUrl + "delete/" + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
