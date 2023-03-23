import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { WpsGroup } from './wps-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeWpsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/WPS/WPSGroup/`;
  }

  getAll() {
    return this.http.get<WpsGroup[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<WpsGroup[]>(this.baseUrl + 'get/' + '/' + id).pipe(map(response => { return response; }));
  }
  getMol(id) {
    return this.http.get<WpsGroup[]>(this.baseUrl + 'get/' +  id).pipe(map(response => { return response; }));
  }
  add(wps: WpsGroup) {
    return this.http.post(this.baseUrl + 'insert', wps).pipe(map(response => { return response; }));
  }

  update(wps: WpsGroup) {
    return this.http.put<number>(this.baseUrl + 'update', wps).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

}
