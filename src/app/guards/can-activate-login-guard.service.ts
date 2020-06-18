import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {TokenService} from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateLoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // If the user is not logged in we'll send them back to the home page
    if (this.tokenService.getRefreshTokenFromStorage() == '' || this.tokenService.getTokenFromStorage() == '') {
      console.log('No estás logueado');
      this.router.navigateByUrl('login');
      console.log(state.url)
      console.log(state.url.replace(/\//g, ""))
      const stringUrl = state.url.replace(/\//g, "")
      this.authService.saveLaunchedLoginPath(stringUrl)
      return false;
    }

    return true;
  }

}
