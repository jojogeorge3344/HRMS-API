import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AdocEntry } from './adoc-entry.model';

@Injectable({
  providedIn: 'root'
})
export class AdocEntryService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/deduction/adhocDeduction/";
  }

  add(adocDetails: AdocEntry) {
    return this.http.post<AdocEntry>(this.baseUrl + 'insert', adocDetails).pipe(map(response => { return response; }));
  }

  getAll() {
    return this.http.get<AdocEntry>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  update(adocDetails: AdocEntry) {
    return this.http.put<AdocEntry>(this.baseUrl + 'update', adocDetails).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<AdocEntry>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  getBenefitTypes(){
    return this.http.get<any>(this.baseUrl + 'getBenefitTypes').pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<AdocEntry>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

}
