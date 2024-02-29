import { Component } from '@angular/core';
import { CakeService } from '../sevices/cake.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private isLoginClicked = false;
  constructor(
    private _cakeservice: CakeService,
    private _route: Router,
    private _authservice: AuthService,
    private snackbar:MatSnackBar
  ) {}

  user = {
    email: '',
    password: '',
  };
  onLoginSubmit() {
    this.isLoginClicked = true; 
    this._cakeservice.checkUserAuthentication(this.user.email, this.user.password).subscribe(
      (authenticated) => {
        if (authenticated) {
          // Successful authentication, fetch the user's data by email
          this._cakeservice.getUserDataByEmail(this.user.email).subscribe(
            (userData) => {
              console.log('Received userData:', userData); // Add this line
              console.log('userData.user_role:', userData.user_role); 
              if (userData && userData.user_role === 'admin') {
                // Set the role to 'admin' in your AuthService
                this._authservice.login(userData);
  
                // Replace alert with MatSnackBar
                this.snackbar.open('Admin login successful', 'Dismiss', { duration: 3000,verticalPosition:'top' });
  
                console.log('Navigating to admin dashboard');
                this._route.navigate(['/admin']); // Navigate to the admin dashboard
              } else {
                // For regular users
                this._authservice.login(userData);
  
                // Replace alert with MatSnackBar
                this.snackbar.open('User login successful', 'Dismiss', { duration: 3000,verticalPosition:'top' });
  
                this._route.navigate(['/']); // Navigate to the user dashboard
              }
            },
            (error) => {
              console.error('Error fetching user data:', error);
  
              // Replace alert with MatSnackBar
              this.snackbar.open('An error occurred while trying to log in', 'Dismiss', { duration: 3000 });
            }
          );
        } else {
          // Invalid credentials
  
          // Replace alert with MatSnackBar
          this.snackbar.open('Invalid username or password', 'Dismiss', { duration: 3000 });
        }
      },
      (error) => {
        console.error('Error during authentication:', error);
  
        // Replace alert with MatSnackBar
        this.snackbar.open('An error occurred while trying to log in', 'Dismiss', { duration: 3000 });
      }
    );
  }
  


  canExist(){
    if (this.isLoginClicked) {
      // User has already clicked on the "Login" button, allow navigation
      return true;
    } else if (this.user.email.trim().length > 0 || this.user.password.trim().length > 0) {
      return confirm("Data will be discarded. Are you sure you want to leave?");
    } else {
      return true;
    }
  }
}
