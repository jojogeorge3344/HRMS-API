import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../../settings/branch/state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/common/MasterData/";
  }
  
//   getAll() {
//     return this.http.get<State[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
//   }

  getStatesByCountryId(countryId) {
    return this.http.get<State[]>(this.baseUrl + 'GetStates/' + countryId).pipe(map(response => { return response; }));
  }  
}
