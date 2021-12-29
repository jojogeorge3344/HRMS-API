import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetAssets } from './asset-assets.model';
import { map } from 'rxjs/operators';
import { AssetTypeMetadata } from '../asset-metadata/asset-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class AssetAssetsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/asset/";
  }

  add(assetAssets: AssetAssets){
    return this.http.post<AssetAssets>(this.baseUrl + 'insert', assetAssets).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<AssetAssets[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAssetById(id){
    return this.http.get<AssetAssets[]>(this.baseUrl + 'GetAssetById/'+id).pipe(map(response => { return response; }));
  }

  getAllMetadata(){
    return this.http.get<AssetAssets[]>(this.baseUrl + 'GetAllAssetTypeMetadataDetailsById/{id}').pipe(map(response => { return response; }));
  }

  getAllAssetList(){
    return this.http.get<AssetAssets[]>(this.baseUrl + 'GetAllAssetList').pipe(map(response => { return response; }));
  }


  update(assetAssets: AssetAssets){
  return this.http.post<AssetAssets>(this.baseUrl + 'update', assetAssets).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<AssetAssets>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<AssetAssets>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getAllAssetTypeById() {
    return this.http.get<AssetAssets[]>(this.baseUrl + 'AssetType/Get/').pipe(map(response => { return response; }));
  }


  GetAssetTypeId(id:number){
    return this.http.get<AssetTypeMetadata[]>(this.baseUrl + 'GetAssetTypeId' + id).pipe(map(response => { return response; }));
  }
}
