import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@aspnet/signalr';
import { MyAssets } from './my-assets.model';

@Injectable({
  providedIn: 'root'
})
export class MyAssetsService {

  public baseUrl: string;
  public http: HttpClient;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/myAssets/";
  }

  getAllMyAssetList(userId){
   // return this.http.get<MyAssets[]>(this.baseUrl + 'getAllMyAssetList').pipe(map(response => { return response; }));
  }
}
