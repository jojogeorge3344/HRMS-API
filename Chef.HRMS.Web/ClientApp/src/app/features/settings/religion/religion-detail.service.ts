import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReligionGroup } from './religion.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReligionService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}`;
  }

  getAll() {
    return this.http.get<ReligionGroup[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }
  add(wps: ReligionGroup) {
    return this.http.post(this.baseUrl + 'insert', wps).pipe(map(response => { return response; }));
  }

}
