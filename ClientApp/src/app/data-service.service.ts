import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private REST_API_SERVER = "https://localhost:5001/weatherforecast/GetReverse?input=";
  constructor(private httpClient: HttpClient) { }
  public sendReverseRequest(inputUrl: any){
    return this.httpClient.get(inputUrl, { responseType: 'text'});
  }
  public sendDuplicateRequest(inputUrl: any){
    return this.httpClient.get(inputUrl, { responseType: 'text'});
  }
}
