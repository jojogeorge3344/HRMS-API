import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PayrollParameterDetails } from "./payroll-parameter-details.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PayrollParameterDetailsComponentService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payroll/payrollcomponent/";
  }

  get(id) {
    return this.http.get<PayrollParameterDetails>(this.baseUrl + "get/" + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getAll() {
    return this.http
      .get<PayrollParameterDetails[]>(this.baseUrl + "getAllOrderByPayrollComponent")
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllAssignedPayrollComponents() {
    return this.http
      .get<number[]>(this.baseUrl + "getAllAssignedPayrollComponents")
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllPayrollComponentByType() {
    return this.http.get<any>(this.baseUrl + "getComponentType/").pipe(
      map((response) => {
        return response;
      })
    );
  }

  add(payrollComponent: PayrollParameterDetails) {
    return this.http
      .post<PayrollParameterDetails>(this.baseUrl + "insert", payrollComponent)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  update(payrollComponent: PayrollParameterDetails) {
    return this.http
      .post<PayrollParameterDetails>(this.baseUrl + "update", payrollComponent)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  delete(id: number) {
    return this.http
      .delete<PayrollParameterDetails>(this.baseUrl + "delete/" + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  isCodeExist(code: string) {
    return this.http.get<boolean>(
      this.baseUrl + "isPayrollComponentCodeExist/" + code
    );
  }
}
