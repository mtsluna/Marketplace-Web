import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Store} from "../model/store";

@Injectable({
  providedIn: 'root'
})
export class StoreService extends GenericService<Store>{

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'stores');
  }
}
