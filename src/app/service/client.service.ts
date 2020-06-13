import { Injectable } from '@angular/core';
import {GenericService} from './generic.service';
import {Client} from '../model/client';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';


@Injectable({
  providedIn: 'root'
})
export class ClientService extends GenericService <Client>{
  httpExtend: HttpClient;
  CLIENT_URL = 'https://udamarket.herokuapp.com/api/clients/';

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'clients');
  }

  getByUsername(username: string){
    return this.httpExtend.get(this.CLIENT_URL+'?username='+username);
  }
}
