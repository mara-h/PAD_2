import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentifService } from '../shared/service/authentif/authentif.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentifGuardGuard implements CanActivate {
  constructor(private authentifService: AuthentifService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(!this.authentifService.isLoggedIn()){
        this.router.navigateByUrl('/login');
        //this.authentifService.deleteToken();
        return false;
      }
      return true;
  }
  
}
