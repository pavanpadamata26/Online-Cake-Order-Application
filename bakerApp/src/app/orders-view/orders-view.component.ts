import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CakeService } from '../sevices/cake.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {
  userOrders: any[]; // Define an array to store the user's orders

  constructor(private authService: AuthService, private cakeService: CakeService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      // Assuming your AuthService stores the user's ID in the currentUser object
      const userId = this.authService.currentUser.id; // Replace with the actual property name for the user ID

      this.cakeService.getCurrentUserOrders(userId).subscribe((orders) => {
        this.userOrders = orders;
        console.log("user orders",this.userOrders)
      });
    } else {
      // Handle the case where the user is not logged in
    }
  }
}