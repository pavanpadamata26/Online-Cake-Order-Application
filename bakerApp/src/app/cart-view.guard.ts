import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class cartViewGuard implements CanActivate {
  constructor(private router: Router,private _authservice:AuthService) {}

  canActivate(): boolean {
    if (this._authservice.isLoggedIn) {
      return true; // User is authenticated, allow access
    } else {
      // User is not authenticated, display an alert and navigate away
      alert("You need to be logged in to access this page.");
      this.router.navigate(['/login']); // Navigate to the login page
      return false; // Deny access
    }
  }
}
