import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { AuthenticationService } from './../@service/authentication.service';

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = next.data.roles as Array<string>;
    if (roles) {
      const match = this.authenticationService.roleMatch(roles);
      if (match) {
        return true;
      }
    }
    this.toastr.error('You are not authorized to access this!!!');
    this.authenticationService.logOut();
    return false;
  }
}
