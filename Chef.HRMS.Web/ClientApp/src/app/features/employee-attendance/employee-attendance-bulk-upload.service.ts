import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceBulkUploadService {

  public baseUrl: string;
  public http: HttpClient;
  public excelUrl: any;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/BulkUpload/ExcelRead/";
    this.excelUrl = baseUrl + "api/BulkUpload/";
  }

  getAll() {
    return this.http.get(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get(this.baseUrl + 'get' + id).pipe(map(response => { return response; }));
  }

  add(report) {
    return this.http.post(this.baseUrl + 'insert', report).pipe(map(response => { return response; }));
  }

  update(report) {
    return this.http.put<number>(this.baseUrl + 'update', report).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  getExcelFormat() {
    return this.http.get(this.excelUrl + 'ExportExcelFormat').pipe(map(response => { return response; }));
  }

}
