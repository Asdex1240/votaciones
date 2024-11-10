import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000'

  post(service: string, data: any){
    return this.http.post(`${this.url}/${service}`,data)
  }
}
