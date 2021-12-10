import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetType } from './asset-type.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetTypeService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/assetType/";
  }

  add(assetType: AssetType){
    return this.http.post<AssetType>(this.baseUrl + 'insert', assetType).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<AssetType[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAllJobTitleList(){
    return this.http.get<AssetType[]>(this.baseUrl + 'getAllJobTitleList').pipe(map(response => { return response; }));
  }

  update(assetType: AssetType){
  return this.http.post<AssetType>(this.baseUrl + 'update', assetType).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<AssetType>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<AssetType>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
}
