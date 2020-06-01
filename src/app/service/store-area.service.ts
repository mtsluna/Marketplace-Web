import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {StoreArea} from "../model/storeArea";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class StoreAreaService extends GenericService<StoreArea> {

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'storeareas');
  }
}
