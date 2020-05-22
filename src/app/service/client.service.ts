import { Injectable } from '@angular/core';
import {GenericService} from './generic.service';
import {Client} from '../model/client';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends GenericService <Client>{

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'clients')
  }

}
