import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WorkFromHomeSettings } from "./work-from-home-settings.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkFromHomeSettingsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/attendance/workFromHomeSettings/";
  }

  get() {
    return this.http.get<WorkFromHomeSettings>(this.baseUrl + 'get/').pipe(map(response => { return response; }));
  }

  add(workFromHomeSettings: WorkFromHomeSettings){
    return this.http.post<WorkFromHomeSettings>(this.baseUrl + 'insert', workFromHomeSettings).pipe(map(response => { return response; }));
  }

  update(workFromHomeSettings: WorkFromHomeSettings){
    return this.http.post<number>(this.baseUrl + 'update', workFromHomeSettings).pipe(map(response => { return response; }));
  }
}