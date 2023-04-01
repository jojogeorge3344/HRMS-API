import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentType } from './document-type.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/documentType/";
  }

  add(DocumentTypeDetails: DocumentType) {
    return this.http.post<DocumentType>(this.baseUrl + 'insert', DocumentTypeDetails).pipe(map(response => { return response; }));
  }
  getAll() {
    return this.http.get<DocumentType[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }
  get(code){
    return this.http.get<DocumentType[]>(this.baseUrl + 'isDocumentCodeExist/'+ code).pipe(map(response => { return response; }));
  }

  update(DocumentTypeDetails: DocumentType) {
    return this.http.post<number>(this.baseUrl + 'update', DocumentTypeDetails).pipe(map(response => { return response; }));
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
