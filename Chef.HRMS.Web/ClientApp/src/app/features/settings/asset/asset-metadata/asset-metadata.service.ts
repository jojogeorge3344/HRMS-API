import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetType } from '../../asset/asset-type/asset-type.model';
import { AssetTypeMetadata } from './asset-metadata.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetMetadataService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/assetTypeMetadata/";
  }

  getAllAssetTypeList(){
    return this.http.get<AssetType[]>(this.baseUrl + 'getAllAssetTypeMetadataDetailsById').pipe(map(response => { return response; }));
  }

  add(assetId, metadata)
  {
    let reqOptions={
      assetTypeId:assetTypeId,
      metadata:metadata
    }
    return this.http.post(this.baseUrl + 'insert', reqOptions).pipe(map(response => { return response; }));
  }
  
  // getAllMetadata(){
  //   return this. http.get<AssetTypeMetadata[]>(this.baseUrl + 'getAllAssetMetadata').pipe(map(response => { return response; }));
  // }

  // getAssetTypeId(assetName){
  //   return this. http.get(this.baseUrl + 'getAssetTypeId/',assetName).pipe(map(response => { return response; }));
  // }


  getAll(){
    return this.http.get<AssetType[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAllMetadata(){
    return this. http.get<AssetTypeMetadata[]>(this.baseUrl+ 'getAll').pipe(map(response => { return response; }));
  }

  
  getAssetMetadataById(id: number) {
    return this.http.get<AssetTypeMetadata[]>(this.baseUrl + 'GetAllAssetTypeMetadataDetailsById/' + id).pipe(map(response => { return response; }));
  }

  
  // update(assetType: AssetType){
  // return this.http.post<AssetType>(this.baseUrl + 'update', assetType).pipe(map(response => { return response; }));
  // }

  // delete(id:number){
  //   return this.http.delete<AssetType>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  // }

  // get(id) {
  //   return this.http.get<AssetType>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  // }
}
