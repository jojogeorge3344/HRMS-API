import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AssetEmployeeWise } from './employee-asset.model';
import { BehaviorSubject, Observable} from 'rxjs';
import { AssetEmployeewiseRequest } from './assetemployeewiserequest.model';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { AssetRaiseRequest} from '@features/employee-assets/raise-request/raise-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeAssetService {
  public baseUrl: string;
  public http: HttpClient;
  private employeeDetails: BehaviorSubject<any>;
 

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.employeeDetails = <BehaviorSubject<any>>new BehaviorSubject({data: []});
    this.http = http;
    this.baseUrl = baseUrl + "api/assetEmployeeWise/";
  }

  setListDetails(data: any) {
    this.employeeDetails.next(Object.assign({}, data));
  }

  getListDetails(): Observable<any> {
    return this.employeeDetails.asObservable();
  }

 


  getAll(){
    return this.http.get<AssetEmployeeWise[]>(this.baseUrl + 'GetAll').pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<AssetEmployeeWise>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getEmployeeRequestById(id) {
    return this.http.get<AssetRaiseRequest>(this.baseUrl + 'GetEmployeeRequestById/' + id).pipe(map(response => { return response; }));
  }

  getAllocatedAssetsById(id) {
    return this.http.get(this.baseUrl + 'GetAllocatedAssetById/' + id).pipe(map(response => { return response; }));
  }

  // UpdateStatus/{id}/{status}
  manageRequest(reqId,status) {
    return this.http.put(this.baseUrl + 'UpdateApproveReject' , reqId,status).pipe(map(response => { return response; }));
  }
}
