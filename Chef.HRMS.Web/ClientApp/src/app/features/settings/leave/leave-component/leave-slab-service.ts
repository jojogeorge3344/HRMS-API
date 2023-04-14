import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LeaveSlabGroup } from './leave-slab.model';



@Injectable({
  providedIn: 'root'
})
export class LeaveSlabService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/LeaveSlab/`;
  }

  getAll() {
    return this.http.get<LeaveSlabGroup[]>(this.baseUrl + 'GetAll').pipe(map(response => { return response; }));
  }
  add(rel: LeaveSlabGroup) {
    return this.http.post(this.baseUrl + 'insert', rel).pipe(map(response => { return response; }));
  }
  update(rel: LeaveSlabGroup) {
    return this.http.post<number>(this.baseUrl + 'update', rel).pipe(map(response => { return response; }));
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  // get(){
  //   return this.http.get<EosSlabGroup[]>(this.baseUrl + 'GetComponentType').pipe(map(response => { return response; }));
  // }
}
