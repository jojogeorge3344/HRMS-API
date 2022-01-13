import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MyAssets } from './my-assets.model';

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
   return this.http.get<MyAssets[]>(this.baseUrl + 'getMyAssetById/'+ userId).pipe(map(response => { return response; }));
  }
  updateStatus(assetData:MyAssets){
    return this.http.post<MyAssets>(this.baseUrl + 'update' , assetData ).pipe(map(response => { return response; }));
  }

  updateStatusOf(id,status) {
    return this.http.put(this.baseUrl + 'UpdateStatus/' + id, id,status).pipe(map(response => { return response; }));
  }
}
