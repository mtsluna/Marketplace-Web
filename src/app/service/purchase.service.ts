import { Injectable } from '@angular/core';
import {GenericService} from './generic.service';
import {Client} from '../model/client';
import {Purchase} from '../model/purchase';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends GenericService <Purchase>{

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'purchases');
  }

}
