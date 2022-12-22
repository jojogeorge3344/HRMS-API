import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // let currentUser = this.authenticationService.getAuthToken;
        // if (currentUser ) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser}`
        //         }
        //     });
        // }
        if (request.headers.get('Authorization') == null) {
            // add authorization header with jwt token if available
            let token = this.authService.getToken();
            if (token != null) {
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                }
              });
            }
          }
        return next.handle(request);
    }
}