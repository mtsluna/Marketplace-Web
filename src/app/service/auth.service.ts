import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Token} from "../model/token";
import {User} from "../model/user";
import {Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'https://udamarket.herokuapp.com/api/';
  isLogged = false;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.http = http;
    this.tokenService = tokenService;
    if(this.tokenService.getTokenFromStorage() != null){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  login(user: User) {
    return this.http.post<Token>(this.BASE_URL + 'login', user);
  }

  authConfirm(): Observable<boolean>{
    const token = this.isLogged;
    if(token != null){
      return of(true);
    }else{
      return of(false);
    }
  }

}
