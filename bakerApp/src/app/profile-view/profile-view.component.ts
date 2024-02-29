import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit{
 user:any;
  constructor(private authservice:AuthService,private route:Router){}
  ngOnInit(): void {
    this.user=this.authservice.currentUser;
    console.log("the current user details are  ",this.user)
  }
  viewOrders() {
    this.route.navigate(['/orders-view']); // Adjust the route as needed
  }
}
