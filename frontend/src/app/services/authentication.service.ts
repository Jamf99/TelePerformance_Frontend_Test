import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface RegisterForm {
  email : string,
  password : string,
  role : string
}

export interface LoginForm {
  email : string,
  password : string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }

  register(registerForm: RegisterForm) {
    return this.http.post('/api/register', {email: registerForm.email, password: registerForm.password, role: registerForm.role})
    .toPromise().then(res => console.log(res))
  }

  login(loginForm: LoginForm) {
    return this.http.post('/api/login', {email: loginForm.email, password: loginForm.password})
    .toPromise().then(res => console.log(res))
  }

}
