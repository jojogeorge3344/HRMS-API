import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SendEmail } from './send-email';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/sendemail/';
  }

  revertToEmployee(emailToSend: SendEmail) {
    return this.http.post(this.baseUrl + 'sendrevertemployeeemail', emailToSend).pipe(map(response => response));
  }
}
