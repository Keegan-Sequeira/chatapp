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

  requestData(url: string, body: object){
    return this.httpClient.post(BACKEND_URL+url, body, headerOptions);
  }
}
