import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpService
  ) { }

  authUser(data: {dni: string}){
    return this.http.post('users/getUserDNI', data)
  }

  getUsers(data:{ event: string}){
    return this.http.post('users/getusers',data)
  }
}

