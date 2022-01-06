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
    this.baseUrl = baseUrl + "api/assetEmployeeWise/";
  }

  getAll(){
    return this.http.get<AssetEmployeeWise[]>(this.baseUrl + 'GetAll').pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<AssetEmployeeWise>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
}
