import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Document } from "@shared/models/document";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/document/";
  }

  get(id) {
    return this.http.get<Document>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
  add(document: Document) {
    return this.http.post<Document>(this.baseUrl + 'insert', document).pipe(map(response => { return response; }));
  }

  update(document: Document) {
    return this.http.post<Document>(this.baseUrl + 'update', document).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<Document>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
