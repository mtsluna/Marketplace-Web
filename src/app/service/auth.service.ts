import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Token} from "../model/token";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  BASE_URL = 'https://udamarket.herokuapp.com/api/';
  isLogged = false;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.http = http;
    this.tokenService = tokenService;
  }

  login(user: User) {
    return this.http.post<Token>(this.BASE_URL + 'login', user);
  }
}
