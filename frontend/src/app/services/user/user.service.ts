import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserData {
  token : string,
  role : string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getDogs(userData : UserData) {
    return this.http.post('/api/dogs', {token: userData.token, role: userData.role})
    .toPromise();
  }
}
