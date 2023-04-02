import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EosGroup } from './eos.model';


@Injectable({
  providedIn: 'root'
})
export class EosService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/EndOfService/`;
  }

  getAll() {
    return this.http.get<EosGroup[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }
  add(rel: EosGroup) {
    return this.http.post(this.baseUrl + 'insert', rel).pipe(map(response => { return response; }));
  }
  update(rel: EosGroup) {
    return this.http.post<number>(this.baseUrl + 'update', rel).pipe(map(response => { return response; }));
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  get(){
    return this.http.get<EosGroup[]>(this.baseUrl + 'GetComponentType').pipe(map(response => { return response; }));
  }
}
