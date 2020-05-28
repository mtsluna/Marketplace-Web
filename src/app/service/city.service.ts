import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {City} from "../model/city";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class CityService extends GenericService<City> {

  constructor(http: HttpClient, tokenService: TokenService)
  {
    super(http, tokenService, 'cities');
  }
}
