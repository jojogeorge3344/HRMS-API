import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { HolidayCategory } from './holiday-category.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HolidayCategoryService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/holidaycategory/";
  }

  getAll() {
    return this.http.get<HolidayCategory[]>(this.baseUrl + 'getall').pipe(map(response => { return response; }));
  }

  getAllAssignedHolidayCategories() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedHolidayCategory').pipe(map(response => { return response; }));
  }

  add(holidayCategory: HolidayCategory) {
    return this.http.post(this.baseUrl + 'insert', holidayCategory).pipe(map(response => { return response; }));
  }

  update(holidayCategory: HolidayCategory) {
    return this.http.post(this.baseUrl + 'update', holidayCategory).pipe(map(response => { return response; }));
  }

  updateHolidayCategory(holidayCategoryId: number, isConfigured: boolean) {
    return this.http.put(this.baseUrl + 'updateHolidayCategory/' + holidayCategoryId + '/' + isConfigured, null).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
