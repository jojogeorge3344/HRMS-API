import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RaiseRequest } from './raise-request.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaiseRequestService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/raiseRequest/";
  }

  add(raiseRequest: RaiseRequest){
    return this.http.post<RaiseRequest>(this.baseUrl + 'insert', raiseRequest).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<RaiseRequest[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAllAssetTypeList(){
    return this.http.get<RaiseRequest[]>(this.baseUrl + 'getAllAssetTypeList').pipe(map(response => { return response; }));
  }

  update(raiseRequest: RaiseRequest){
  return this.http.post<RaiseRequest>(this.baseUrl + 'update', raiseRequest).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<RaiseRequest>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id:number) {
    return this.http.get<RaiseRequest>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
}
