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


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/assetTypeMetadata/";
  }


  add(metadata: AssetTypeMetadata) {
    return this.http.post<AssetTypeMetadata[]>(this.baseUrl + 'insert', metadata).pipe(map(response => { return response; }));
  }

  // getAllMetadata() {
  //   return this.http.get<AssetTypeMetadata[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  // }

  update(metadata: AssetTypeMetadata) {
    return this.http.put<AssetTypeMetadata[]>(this.baseUrl + 'update', metadata).pipe(map(response => { return response; }));
  }

  deleteMetadata(id: number) {
    return this.http.delete<AssetTypeMetadata>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  getAllMetadata(){
    return this. http.get<AssetTypeMetadata[]>(this.baseUrl+ 'getAll').pipe(map(response => { return response; }));
  }

  getAssetMetadataById(id: number) {
    return this.http.get<AssetTypeMetadata[]>(this.baseUrl + 'GetAllAssetTypeMetadataDetailsById/'+ id).pipe(map(response => { return response; }));
  }
  
  deleteAssetType(id: number) {
    return this.http.delete<AssetTypeMetadata>(this.baseUrl + 'deleteAssetType/' + id).pipe(map(response => { return response; }));
  }
}

