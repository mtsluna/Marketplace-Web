import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {TokenService} from '../service/token.service';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {Token} from '../model/token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.tokenService.getTokenFromStorage() != ''){
      request = this.addAuthToken(request, this.tokenService.getTokenFromStorage());
    }

    // @ts-ignore
    return next.handle(request).pipe(
      catchError(error => {
        if(error instanceof HttpErrorResponse && error.status === 401){
          return this.handle401Error(request, next);
        }
        else{
          return throwError(error);
        }
      })
    );

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.getTokenForRefreshHttp().pipe(
        switchMap((token: Token) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.token);
          
          return next.handle(this.addAuthToken(request, token.token));
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        take(1),
        switchMap(token => {
          return next.handle(this.addAuthToken(request, token));
        }));
    }
  }

  addAuthToken(request: HttpRequest<any>, token: string){
    console.log(token);
    request = request.clone({
      setHeaders: {
        'Authorization': 'Bearer '+token
      }
    });
    return request;
  }

}
