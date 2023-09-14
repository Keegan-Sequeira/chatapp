import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const headerOptions = {
  headers: new HttpHeaders( { "Content-Type": "application/json" } )
};

const BACKEND_URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  data = {};

  apiPost(url: string, body: object){
    return this.httpClient.post(BACKEND_URL+url, body, headerOptions);
  }

  apiGet(url: string){
    return this.httpClient.get(BACKEND_URL+url, headerOptions);
  }

  imgUpload(fd: any){
    return this.httpClient.post<any>(BACKEND_URL + "/api/image/upload", fd);
  }
}
