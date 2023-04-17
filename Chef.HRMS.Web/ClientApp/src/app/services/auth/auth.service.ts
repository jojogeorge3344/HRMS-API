import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { FeaturesService } from "@shared/services/features.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  features: any;
  subFeatures: any;
  userId: any;

  constructor(
    private http: HttpClient,
    @Inject("AUTH_URL") private baseUrl: string,
    private router: Router,
    private featuresService: FeaturesService
  ) {}

  public get getAuthToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  login(auth) {
    return this.http
      .post<any>(this.baseUrl + "Login", auth)
      .subscribe((res: any) => {
        this.setToken(res.token);
        if (localStorage.getItem("token")) {
          this.getCurrentUser().subscribe((res) => {
            if (res) {
              this.userId = res.id;
              this.getEmployeeId();
            }
          });
        } else {
        }
      });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    return;
  }

  resetPassword(obj) {
    return this.http.post<any>(`${this.baseUrl}resetpassword`, obj).pipe(
      map((response) => {
        return response;
      })
    );
  }

  insertNewUser(obj) {
    return this.http.post<any>(`${this.baseUrl}Insert`, obj).pipe(
      map((response) => {
        return response;
      })
    );
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken(token) {
    localStorage.removeItem("token");
  }

  getCurrentUser() {
    return this.http.get<any>(this.baseUrl + "getCurrentUser");
  }

  getEmployeeId() {
    this.featuresService.getById(this.userId).subscribe((response) => {
      console.log("aaa", response);
      if (response) {
        localStorage.setItem("currentUser", JSON.stringify(response));
        response = response.flatMap((feature) => [
          feature.featureName.toLowerCase(),
          `${feature.featureName.toLowerCase()}-${feature.subFeatureName.toLowerCase()}`,
        ]);
      }
      this.features = response.filter((feature, i) => i % 2 === 0);
      this.subFeatures = response.filter((feature, i) => i % 2 === 1);

      localStorage.setItem("features", this.features.join(","));
      localStorage.setItem("subFeatures", this.subFeatures.join(","));
      this.router.navigate(["/"]);
    });
  }
}
