import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpoloyeePayrollReportService {


  public baseUrl: string;
  public http: HttpClient;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/payrollStructureExcel/";
  }

  previewReport() {
    return this.http.get<any[]>(this.baseUrl + 'payrollStructureExcelReport').pipe(map(response => response));
  }

}
