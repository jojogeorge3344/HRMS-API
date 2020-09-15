import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Bank } from './bank';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BranchBankService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/branch/bank/";
  }

  getAllByBranch(branchId: number) {
    return this.http.get<Bank>(this.baseUrl + 'getAllByBranch/' + branchId).pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<Bank>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(bank: Bank) {
    return this.http.post<Bank>(this.baseUrl + 'insert', bank).pipe(map(response => { return response; }));
  }

  update(bank: Bank) {
    return this.http.post<Bank>(this.baseUrl + 'update', bank).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<Bank>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}