import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router : Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if(token!=null) {
        if(next.data.permission && next.data.permission !== role || next.data.permission == '') {
          return false;
        }
        return true;
      }
      if(next.data.permission == '') {
        return true;
      }
      return false;
  }
  
}
