import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {ProductArea} from "../model/productArea";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ProductAreaService extends GenericService<ProductArea> {

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'productareas');
  }
}
