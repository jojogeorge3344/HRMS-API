import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Shift } from './shift.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ShiftService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/attendance/shift/";
  }

  getAll() {
    return this.http.get<Shift[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  getShiftByEmployeeId(id: number) {
    return this.http.get<Shift>(this.baseUrl + 'getShiftByEmployeeId/'+ id).pipe(map(response => { return response; }));
  }

  getAssignedShifts() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedShift/').pipe(map(response => { return response; }));
  }

  add(shift: Shift) {
    return this.http.post<Shift>(this.baseUrl + 'insert', shift).pipe(map(response => { return response; }));
  }

  update(shift: Shift) {
    return this.http.put<number>(this.baseUrl + 'update', shift).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<number>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
