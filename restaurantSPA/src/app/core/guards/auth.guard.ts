import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Injectable, Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { MainComponent } from '../../main/main.component';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanDeactivate<MainComponent> {
    constructor(private auth: AuthService, private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const loggedIn = this.auth.loggedIn()
        const url = this.router.createUrlTree(['/login']);
        if (!this.auth.loggedIn()) {
          return true;
        } else {
          return url;
        }
    }

    canDeactivate(
      component: MainComponent,
      currentRoute: ActivatedRouteSnapshot, 
      currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
      return true;
    }


}