import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {Image} from "../model/image";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService extends GenericService<any> {

  constructor(http: HttpClient, tokenService: TokenService) {
    super(http, tokenService, 'images');
  }
}
