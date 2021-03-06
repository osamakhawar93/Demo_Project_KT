import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
    /**
    *get user object from local storage
    *@param {object} validator will be true if object find else validator will be false
    */
    let validator = false;
    validator ? {} :this.router.navigate(['/'])
    return validator;
  }
}
