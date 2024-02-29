import { Component } from '@angular/core';
import { CakeService } from '../sevices/cake.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-oreders-view',
  templateUrl: './admin-oreders-view.component.html',
  styleUrls: ['./admin-oreders-view.component.css']
})
export class AdminOredersViewComponent {

  allUserOrders: any[] = [];
  isAdmin: boolean = false;
  constructor(private cakeService: CakeService, private authService: AuthService) { }

  ngOnInit() {
   
    
   
    this.isAdmin = this.authService.currentUser && this.authService.currentUser.user_role === 'admin';

    // Load user data, including orders, using the CakeService
    this.cakeService.loadUsers().subscribe((users) => {
      // Extract orders from user data
      this.allUserOrders = users.reduce((orders, user) => {
        if (user.orders && user.orders.length > 0) {
          orders.push(...user.orders);
        }
        return orders;
      }, []);

      // Log the flattened orders for debugging
      console.log('Flattened orders:', this.allUserOrders);
    });
  }

  changeOrderStatus(order: any) {
    if (this.isAdmin) {
      // Check if the status is 'ordered'; if not, no need to update
      if (order.status !== 'ordered') {
        return;
      }

      // Change the order status locally
      order.status = 'Confirmed';

      // Update the order status on the server
      this.cakeService.updateUserData(order.cakeId, order).subscribe(
        (response) => {
          // Check the response for success
          if (response) {
            // Success
          } else {
            // Handle any errors or display a message to the admin
            console.error('Failed to update the order status on the server.');
          }
        },
        (error) => {
          // Handle HTTP error (e.g., connection issue)
          console.error('HTTP request error:', error);
        }
      );
    }
  }
  }


