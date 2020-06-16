import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Store} from "../model/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService extends GenericService<Store>{
  httpExtend: HttpClient;
  STORE_URL = 'https://udamarket.herokuapp.com/api/stores';
  constructor(http: HttpClient, tokenService: TokenService, httpExtend: HttpClient) {
    super(http, tokenService, 'stores');
    this.httpExtend = httpExtend;
  }

  getByUsername(username: string){
    return this.httpExtend.get(this.STORE_URL+'?user.username='+username);
  }
}
