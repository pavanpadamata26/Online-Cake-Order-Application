import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { RegisterUserComponent } from './register-user/register-user.component';



@Injectable({
  providedIn: 'root'
})
export class registerGuard implements CanDeactivate<RegisterUserComponent> {
   canDeactivate(component: RegisterUserComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return component.canExist();
   }
  
}

