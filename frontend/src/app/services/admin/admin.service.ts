import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserData {
  token : string,
  role : string
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  getCats(userData : UserData) {
    return this.http.post('/api/cats', {token: userData.token, role: userData.role})
    .toPromise();
  }
}
