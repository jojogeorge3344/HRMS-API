import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Signatory } from './signatory';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BranchSignatoryService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/branch/signatory/";
  }

  getAllByBranch(branchId) {
    return this.http.get<Signatory[]>(this.baseUrl + 'getAllByBranch/' + branchId).pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<Signatory>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(signatory: Signatory) {
    return this.http.post<Signatory>(this.baseUrl + 'insert', signatory).pipe(map(response => { return response; }));
  }

  update(signatory: Signatory) {
    return this.http.post<Signatory>(this.baseUrl + 'update', signatory).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<Signatory>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}