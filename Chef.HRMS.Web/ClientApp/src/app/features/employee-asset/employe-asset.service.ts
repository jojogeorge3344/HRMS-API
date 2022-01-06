import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AssetEmployeeWise } from './employee-asset.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeAssetService {
  public baseUrl: string;
  public http: HttpClient;
  private commodityBasicDetails: BehaviorSubject<any>;
 

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.commodityBasicDetails = <BehaviorSubject<any>>new BehaviorSubject({data: []});
    this.http = http;
    this.baseUrl = baseUrl + "api/assetEmployeeWise/";
  }

  setListDetails(data: any) {
    this.commodityBasicDetails.next(Object.assign({}, data));
  }

  getListDetails(): Observable<any> {
    return this.commodityBasicDetails.asObservable();
  }

 


  getAll(){
    return this.http.get<AssetEmployeeWise[]>(this.baseUrl + 'GetAll').pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<AssetEmployeeWise>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
}
