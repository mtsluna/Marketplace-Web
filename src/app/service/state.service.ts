import { Injectable } from '@angular/core';
import {State} from "../model/state";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class StateService extends GenericService<State>{

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'states');
  }
}
