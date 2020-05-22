import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {TokenService} from '../service/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      tap((event)=>{
        if(event instanceof HttpResponse){

        }
      },(error)=>{
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this.tokenService.getRefreshTokenFromStorage()
          }
        }
      })
    )

  }
}
