import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {ProductArea} from '../model/productArea';

@Injectable({
  providedIn: 'root'
})
export class ProductAreaService extends GenericService<ProductArea> {

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'productareas');
  }
}
