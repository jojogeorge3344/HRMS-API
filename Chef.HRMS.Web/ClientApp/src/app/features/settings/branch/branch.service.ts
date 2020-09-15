import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Branch } from './branch';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BranchService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/branch/";
  }

  getAll() {
    return this.http.get<Branch[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<Branch>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(branch: Branch) {
    return this.http.post<Branch>(this.baseUrl + 'insert', branch).pipe(map(response => { return response; }));
  }

  update(branch: Branch) {
    return this.http.post<Branch>(this.baseUrl + 'update', branch).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<Branch>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}