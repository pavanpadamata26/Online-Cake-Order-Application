import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CakeService } from '../sevices/cake.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {
  isLoggedIn: boolean = false; // To track if a user is logged in
  userData: any; // To store the current user's data
  userItems: any[] = []; // To store the current user's items

  constructor(private authService: AuthService, private cakeService: CakeService,private _router:Router) { }

  ngOnInit() {
    // Check if a user is logged in
    this.isLoggedIn = this.authService.isLoggedIn;

    // If a user is logged in, fetch their data
    if (this.isLoggedIn) {
      const userEmail = this.authService.currentUser.email; // Assuming you store the user's email in currentUser

      // Fetch the current user's data by email
      this.cakeService.getUserDataByEmail(userEmail).subscribe(
        (user) => {
          this.userData = user;
          // Assuming the user's items are stored in a 'items' property
          this.userItems = user.items || [];
        },
        (error) => {
          console.error('Error fetching current user data:', error);
        }
      );
    }
  }

  removeFromCart(index: number) {
    if (index >= 0 && index < this.userItems.length) {
      // Remove the item at the specified index
      this.userItems.splice(index, 1);

      // Update the user's data in the server (CakeService)
    //   const userId = this.userData.id; // Assuming 'id' is the user's ID property
    //   this.cakeService.updateUserData(userId, this.userData).subscribe(
    //     (updatedUser) => {
    //       // User data updated successfully
    //       this.userData = updatedUser;
    //     },
    //     (error) => {
    //       console.error('Error updating user data:', error);
    //     }
    //   );
    // }
  }
}
  calculateTotalPrice(): number {
    // Calculate the total cart price by summing up the prices of all items
    return this.userItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  navigateToHome() {
    // Navigate to the default home view (you need to define the route path)
    this._router.navigate(['/']); // Adjust the route path as needed
  }
  // buyNow() {
  //   if (this.isLoggedIn) {
  //     // Create an order object with items, order date, and status
  //     const order = {
  //       items: this.userItems, // Move cart items to the order
  //       orderDate: new Date().toISOString(), // Add the current date and time
  //       status: 'Pending' // Set the order status as 'Pending'
  //     };
  
  //     // Clear the cart items
  //     this.userItems = [];
  
  //     // Update the user's data with the new order and empty cart
  //     if (!this.userData.orders) {
  //       this.userData.orders = [];
  //     }
  //     this.userData.orders.push(order);
  
  //     // Clear the items array in the user's data
  //     this.userData.items = [];
  
  //     // Update the user's data on the server
  //     this.cakeService.updateUserForBuyNow(this.userData).subscribe(
  //       (updatedUser) => {
  //         // Optionally, navigate to a success or confirmation page
  //         this._router.navigate(['/order-view']); // Adjust the route path as needed
  //       },
  //       (error) => {
  //         console.error('Error updating user data:', error);
  //       }
  //     );
  //   }
  // }
  buyNow() {
    if (this.isLoggedIn) {
      // Create individual order objects for each item in userItems
      for (const item of this.userItems) {
        const order = {
          cakeId: item.cakeId,
          itemName: item.itemName,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          orderDate: new Date().toISOString(), // Add the current date and time
          status: 'ordered' // Set the order status as 'Pending'
        };
        
        // Add the individual order to the orders array
        if (!this.userData.orders) {
          this.userData.orders = [];
        }
        this.userData.orders.push(order);
      }
    
      // Clear the cart items
      this.userItems = [];
    
      // Clear the items array in the user's data
      this.userData.items = [];
    
      // Update the user's data on the server
      this.cakeService.updateUserForBuyNow(this.userData).subscribe(
        (updatedUser) => {
          // Optionally, navigate to a success or confirmation page
          this._router.navigate(['/orders-view']); // Adjust the route path as needed
        },
        (error) => {
          console.error('Error updating user data:', error);
        }
      );
    } else {
      // Handle the case where the user is not logged in (e.g., show an error message or prompt for login).
      console.error('User is not logged in.');
    }
  }
  
  
  
  }
  
  
  
  



