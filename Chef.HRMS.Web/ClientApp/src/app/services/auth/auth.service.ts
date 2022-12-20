import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl: string;

  constructor(private http: HttpClient, @Inject("AUTH_URL") private baseUrl: string,
  private router: Router) {
    // this.baseUrl = `${baseUrl}api/account/`;
   }
   public get getAuthToken() {
     return localStorage.getItem('token')
   }
  isLoggedIn(){
    
      if(localStorage.getItem('token')){
        return true
      }
      return false
    
  }
  // login(email: string, password: string) {
  //   return this.http.post<any>(`${this.baseUrl}login`, { email, password })
  //       .pipe(map(user => {
  //           localStorage.setItem('currentUser', JSON.stringify(user));
  //           return user;
  //       }));
  // }

  
  login(auth) {
    debugger
    return this.http
      .post<any>(this.baseUrl + "Login", auth)
      .subscribe((res: any) => {
        debugger;
        this.setToken(res.token);
        if(localStorage.getItem("token")){
          debugger
          this.getCurrentUser()
          this.router.navigate(['/']);
        }
      });
  }
  logout() {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      return;
      // this.currentUserSubject.next(null);
  }

  resetPassword(obj) {
    return this.http.post<any>(`${this.baseUrl}resetpassword`,obj).pipe(map(response => { return response; }));
  }

  insertNewUser(obj) {
    return this.http.post<any>(`${this.baseUrl}Insert`,obj).pipe(map(response => { return response; }));
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
    return this.http.get<any>(this.baseUrl + "GetCurrentUser");
}

}
