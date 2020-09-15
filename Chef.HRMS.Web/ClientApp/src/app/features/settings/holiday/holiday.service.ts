import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Holiday } from './holiday.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HolidayService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/holiday/";
  }

  getAllByCategory(categoryId: number) {
    return this.http.get<Holiday[]>(this.baseUrl + 'getAllByCategory/' + categoryId).pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<Holiday>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(holiday: Holiday) {
    return this.http.post(this.baseUrl + 'insert', holiday).pipe(map(response => { return response; }));
  }

  update(holiday: Holiday) {
    return this.http.post(this.baseUrl + 'update', holiday).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  getAllHolidaysByEmployeeId(id: number) {
    return this.http.get<string[]>(this.baseUrl + 'getAllHolidaysByEmployee/' + id).pipe(map(response => { return response; }));
  }
}
