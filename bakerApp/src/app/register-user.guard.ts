import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class  registerUserGuard implements CanActivate {
  constructor(private _authservice:AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this._authservice.isLoggedIn) {
      // User is already logged in, prevent access and display a message
      alert('You are already a registered user. Please proceed with shopping.');
      this.router.navigate(['/']); // Redirect to shopping page
      return false; // Deny access
    }
    return true; // Allow access
  }
}
