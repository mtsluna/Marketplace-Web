import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../model/user';
import { Token } from '../model/token';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getTokenForLoginHttp(username: string, password: string): Observable<Token>{
    // @ts-ignore
    let user: User = {
      username: username,
      password: password
    };

    return this.http.post<Token>(this.BASE_URL+'login', user);
  }

  getTokenForRefreshHttp(){
    // @ts-ignore
    let token: Token = {
      refresh_token: this.getRefreshTokenFromStorage()
    }
    return this.http.post<Token>(this.BASE_URL+'login/refresh', token).pipe(
      tap((data)=>{
        console.log(data);
        this.saveTokenInStorage(data.token);
        this.saveRefreshTokenInStorage(data.refresh_token);
      })
    );
  }

  checkTokenHttp(){
    let headers = this.getHeaders();
    return this.http.get(this.BASE_URL+'token/check', {
      headers: this.getHeaders()
    });
  }

  getHeaders(){
    const auth = {
      'Authorization': 'Bearer '+this.getTokenFromStorage()
    };
    const headers = new HttpHeaders(auth);
    return headers;
  }

  saveRefreshTokenInStorage(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  getRefreshTokenFromStorage(): string {
    return localStorage.getItem('refreshToken');
  }

  saveTokenInStorage(refreshToken: string): void {
    localStorage.setItem('token', refreshToken);
  }

  getTokenFromStorage(): string {
    return localStorage.getItem('token');
  }

}
