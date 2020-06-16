import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {Product} from "../model/product";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericService<Product>{

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'products');
  }
}
