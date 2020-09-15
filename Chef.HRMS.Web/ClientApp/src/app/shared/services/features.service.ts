import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getCurrentUser } from '@shared/utils/utils.functions';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  public baseUrl: string;
  public http: HttpClient;
  user: any;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/settings/Roles/UserRole/';
    this.user = getCurrentUser();
  }

  get() {
    return this.http.get<any[]>(this.baseUrl + 'GetUserRole/' + this.user.employeeId)
      .pipe(
        map(res => res)
      );
  }
  getById(id) {
    return this.http.get<any[]>(this.baseUrl + 'GetUserRole/' + id)
      .pipe(
        map(res => res)
      );
  }
}
