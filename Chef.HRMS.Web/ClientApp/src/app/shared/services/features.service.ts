import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FeaturesService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/Roles/UserRole/";
  }

  getById(id) {
    return this.http
      .get<any[]>(this.baseUrl + "GetUserRole/" + id)
      .pipe(map((res) => res));
  }
}
