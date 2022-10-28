import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../modules/authentication/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class DefaultGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
      : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/games/lottery']);
    } else {
      this.router.navigate(['/auth/login']);
    }
    return false;
  }

}
