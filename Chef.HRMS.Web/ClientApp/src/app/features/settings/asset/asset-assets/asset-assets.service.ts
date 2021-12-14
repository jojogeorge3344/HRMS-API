import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetAssets } from './asset-assets.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetAssetsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/AssetAssets/";
  }

  add(assetAssets: AssetAssets){
    return this.http.post<AssetAssets>(this.baseUrl + 'insert', assetAssets).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<AssetAssets[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAllAssetList(){
    return this.http.get<AssetAssets[]>(this.baseUrl + 'getAllAssetList').pipe(map(response => { return response; }));
  }

  update(assetAssets: AssetAssets){
  return this.http.post<AssetAssets>(this.baseUrl + 'update', assetAssets).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<AssetAssets>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  getAssetById(id) {
    return this.http.get<AssetAssets>(this.baseUrl + '' + id).pipe(map(response => { return response; }));
  }

  getAllAssetTypeById(id: number) {
    return this.http.get<AssetAssets[]>(this.baseUrl + 'AssetType/Get/' + id).pipe(map(response => { return response; }));
  }

  getAssetMetadataById(id: number) {
    return this.http.get<AssetAssets[]>(this.baseUrl + 'AssetTypeMetadata/GetAllAssetTypeMetadataDetailsById/' + id).pipe(map(response => { return response; }));
  }
}
