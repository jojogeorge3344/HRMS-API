import { Injectable,Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Notifications } from './notifications-model';
@Injectable({
  providedIn: 'root'
})
export class NotificationsModalService {
  public baseUrl: string;
  public http: HttpClient;
  openSettings$ = new Subject<boolean>();
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/employee/';
  }
  public openModal() {
    this.openSettings$.next(true);
  }
  GetAllNotificationById(id) {
    return this.http.get<Notifications[]>(this.baseUrl + 'GetAllNotificationById/' + id)
      .pipe(
        map(res => res)
      );
  }
}
