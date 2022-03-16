import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MyAssets } from './my-assets.model';
import { AssetAllocated } from './asset-allocated.model';

@Injectable({
  providedIn: 'root'
})
export class MyAssetsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/assetMyAsset/";
  }

  getAllMyAssetList(userId){
   return this.http.get<AssetAllocated[]>(this.baseUrl + 'getMyAssetById/'+ userId).pipe(map(response => { return response; }));
  }
  updateStatus(assetData:MyAssets){
    return this.http.post<MyAssets>(this.baseUrl + 'update' , assetData ).pipe(map(response => { return response; }));
  }
  insertRequest(raiseRequestData:any){
    return this.http.post<any>(this.baseUrl + 'insertRequest' , raiseRequestData ).pipe(map(response => { return response; }));
  }
  // updateReturnStatus(assetData:MyAssets){
  //   return this.http.post<MyAssets>(this.baseUrl + 'updateReturn' , assetData ).pipe(map(response => { return response; }));
  // }
}
