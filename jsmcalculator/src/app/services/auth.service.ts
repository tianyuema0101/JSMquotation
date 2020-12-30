import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) {}

  login(credentials){
    return this.http.post('/api/v1/users/login',credentials)
    .pipe(
      map((res)=>{
        if(res && res['token']){
          //console.log(res['token']);
          localStorage.setItem('token', res['token']);
          return true;
        }
        console.log(res);
        return false;
      }

      )
    );
  }

  logout(){
    localStorage.removeItem('token')
  }

  isLoggedIn(){
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    //console.log(expirationDate);
    //console.log(isExpired);

    return !isExpired;
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token) return null;

    let jwtHelper = new JwtHelperService();
    let userInfo = jwtHelper.decodeToken(token)
    //console.log(userInfo);
    if(userInfo["role"] == "admin")
      return true;
  }

  currentUserId(){
    let token = localStorage.getItem('token');
    if(!token) return null;
    let jwtHelper = new JwtHelperService();
    let userInfo = jwtHelper.decodeToken(token)

    return userInfo["id"];
  }
}
