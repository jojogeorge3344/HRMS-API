import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/settings/role/';
  }

  getall() {
    return this.http.get<any[]>(this.baseUrl + 'getall')
      .pipe(
        map(roles => roles.map(role => {
          return {
            ...role,
            description: `${role.name} desription`
          }
        })));
  }
}
