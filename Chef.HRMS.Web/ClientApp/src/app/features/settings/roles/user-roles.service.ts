import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/settings/roles/UserRole/';
  }

  getall() {
    return this.http.get<any[]>(this.baseUrl + 'getall').pipe(map(roles => roles));
  }
  insert(userRole) {
    return this.http.post(this.baseUrl + 'insert', userRole).pipe(map(response => response));
  }
  update(userRole) {
    return this.http.put(this.baseUrl + 'update', userRole).pipe(map(response => response));
  }
}
