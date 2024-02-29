import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admindasboard',
  templateUrl: './admindasboard.component.html',
  styleUrls: ['./admindasboard.component.css']
})
export class AdmindasboardComponent {
  currentUser: any;
  isAdmin: boolean;

  constructor(private authService: AuthService) {
    console.log('AdminDashboardComponent constructor');
    this.currentUser = this.authService.currentUser;
    console.log('currentUser:', this.currentUser);

    this.isAdmin = this.currentUser.user_role === 'admin';
    console.log(this.isAdmin);
  }

}
