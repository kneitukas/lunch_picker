import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterRequest, LoginRequest, LoginResponse } from 'src/app/models/account.model'; 

const url = "http://localhost:8080/" 

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  jwtHelper = new JwtHelperService()
  decodedToken: string

  constructor(private http: HttpClient) { 

  }

  Register(formData: RegisterRequest): Observable<any> {
    return this.http.post(url + "register", formData)
  } 

  Login(formData: LoginRequest): Observable<any> {
    return this.http.post(url + "login", formData)
    .pipe(
      map(
        (res: LoginResponse) => {
          console.log(res)
          const token = res.Token;
          if (token) {
            localStorage.setItem('token', token)
            localStorage.setItem('email', res.email)
            this.decodedToken = this.jwtHelper.decodeToken(token);
          }
        } 
      )) 
  }

  cleanUpStorage() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }

  get token () {
    return localStorage.getItem('token')
  }

  get email() {
    return localStorage.getItem('email')
  }

  loggedIn() {
    const token = localStorage.getItem("token")
    return this.jwtHelper.isTokenExpired(token)
  }

}
