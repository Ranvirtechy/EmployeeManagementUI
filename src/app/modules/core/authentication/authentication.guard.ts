import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }
   
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (sessionStorage.getItem('credentials') || localStorage.getItem('credentials')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url

    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;

  }
}
