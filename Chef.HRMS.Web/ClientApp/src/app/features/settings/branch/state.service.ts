import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from './state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/state/";
  }
  
  getAll() {
    return this.http.get<State[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAllByCountry(countryId) {
    return this.http.get<State[]>(this.baseUrl + 'getAllByCountry/' + countryId).pipe(map(response => { return response; }));
  }  
}
