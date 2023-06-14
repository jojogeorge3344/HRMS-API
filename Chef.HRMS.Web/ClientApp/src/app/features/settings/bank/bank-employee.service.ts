import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankGroup} from './bank-employee.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BankService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/BankMaster/`;
  }

  getAll() {
    return this.http.get<BankGroup[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }
  add(rel: BankGroup) {
    return this.http.post(this.baseUrl + 'insert', rel).pipe(map(response => { return response; }));
  }
  update(rel: BankGroup) {
    return this.http.post<number>(this.baseUrl + 'update', rel).pipe(map(response => { return response; }));
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  get(code){
    return this.http.get<BankGroup[]>(this.baseUrl + 'IsBankCodeExist/'+ code).pipe(map(response => { return response; }));
  }
  getBankName(bankName){
    return this.http.get<BankGroup[]>(this.baseUrl + 'IsBankNameExist/'+ bankName).pipe(map(response => { return response; }));
  }
}
