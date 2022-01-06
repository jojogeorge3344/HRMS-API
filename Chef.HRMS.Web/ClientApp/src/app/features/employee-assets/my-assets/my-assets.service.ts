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
}
