import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AssetEmployeeWise } from './employee-asset.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeAssetService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/employye-asset";
  }

  getAllEmployeeDetails(){
    return this.http.get<AssetEmployeeWise[]>(this.baseUrl + 'GetAllEmployeeDetails').pipe(map(response => { return response; }));
  }

  getAllAllocatedAssets(){
    return this.http.get<AssetEmployeeWise[]>(this.baseUrl + 'GetAllAllocatedAssets').pipe(map(response => { return response; }));
  }

  getAllRequests(){
    return this.http.get<AssetEmployeeWise[]>(this.baseUrl + 'GetAllRequests').pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<[]>(this.baseUrl + 'GetAll').pipe(map(response => { return response; }));
  }
}
