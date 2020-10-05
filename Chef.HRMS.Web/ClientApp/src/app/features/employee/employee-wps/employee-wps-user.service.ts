import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WpsUser } from './wps-user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeWpsUserService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/WPS/WPSUser/`;
  }

  getAll() {
    return this.http.get<WpsUser[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<WpsUser[]>(this.baseUrl + 'GetAllByemployeeId/' + id).pipe(map(response => { return response; }));
  }

  add(wps: WpsUser) {
    return this.http.post(this.baseUrl + 'insert', wps).pipe(map(response => { return response; }));
  }

  update(wps: WpsUser) {
    return this.http.put<number>(this.baseUrl + 'update', wps).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

}