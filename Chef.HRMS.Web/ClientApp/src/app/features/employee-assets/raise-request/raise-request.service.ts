import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetRaiseRequest } from './raise-request.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaiseRequestService {
  public baseUrl: string;  
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/AssetRaiseRequest/";
  }

  add(raiseRequest: AssetRaiseRequest){
    return this.http.post<AssetRaiseRequest>(this.baseUrl + 'insert', raiseRequest).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<AssetRaiseRequest[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }
  getEmployeeDetails(){
    return this.http.get<any[]>(this.baseUrl + 'getEmployeeDetails').pipe(map(response => { return response; }));
  }

  getAllRaiseRequestList(currentUserId){
    return this.http.get<AssetRaiseRequest[]>(this.baseUrl + 'getAllRaiseRequestList/' + currentUserId).pipe(map(response => { return response; }));
  }

  update(raiseRequest: AssetRaiseRequest){
  return this.http.put<AssetRaiseRequest>(this.baseUrl + 'update', raiseRequest).pipe(map(response => { return response; }));
  }

  delete(id){
    return this.http.put<AssetRaiseRequest>(this.baseUrl + 'UpdateRevoke',{},
    {params:{id:id}}).pipe(map(response => { return response; }));
  }

  get(id:number) {
    return this.http.get<AssetRaiseRequest>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
}
