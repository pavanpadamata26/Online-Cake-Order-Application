import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  currentUser:any;

  constructor(private router:Router,private snackbar:MatSnackBar) {}

  login(user:any) {
    this.isLoggedIn = true;
    this.currentUser=user;
    if (user && user.role === 'admin') {
      console.log('Admin authorized. Navigating to /admin.');
      this.router.navigate(['/admin']);
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  
    // Configure the snackbar
    const config = {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top' as MatSnackBarVerticalPosition, // Display at the top
    };
  
    // Show the snackbar
    this.snackbar.open('You are logged out', 'Close', config);
  
    this.router.navigate(['/']);
  }

  getUserDetails(): any {
    return this.currentUser;
  }
  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
 
}
