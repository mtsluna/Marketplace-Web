import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService <S> {

  BASE_URL = 'https://udamarket.herokuapp.com/api/';

  constructor(private http: HttpClient, private tokenService: TokenService, @Inject(String) private readonly url: string) {
    this.url = url;
    this.http = http;
    this.tokenService = tokenService;
  }

  getAllWithPagination(page: number){
    return this.http.get(this.BASE_URL+this.url+'?page='+page, {observe: "response"});
  }

  getAll(): Observable<S[]>{
    return this.http.get<S[]>(this.BASE_URL+this.url);
  }

  getById(id: number): Observable<S> {
    return this.http.get<S>(this.BASE_URL+this.url+'/'+id);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.BASE_URL+this.url+'/'+id);
  }

  putById(id: number, object: S): Observable<S>{
    return this.http.put<S>(this.BASE_URL+this.url+'/'+id, object);
  }

  post(object: S): Observable<S>{
    return this.http.post<S>(this.BASE_URL+this.url, object);
  }

}
