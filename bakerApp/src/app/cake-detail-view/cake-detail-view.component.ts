import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CakeService } from '../sevices/cake.service';
import { Cake } from '../models/cake';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cake-detail-view',
  templateUrl: './cake-detail-view.component.html',
  styleUrls: ['./cake-detail-view.component.css']
})
export class CakeDetailViewComponent implements OnInit {
  cake: Cake = {};
  selectedQuantity: number = 1;
  totalPrice: number = +this.cake.price; // Initialize with default price
  isBlankQuantity: boolean = false; // Add this variable

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      let id = params.get('id') ?? 0;
      this._cakeservice.getCake(+id).subscribe(data => {
        this.cake = data;
        this.selectedQuantity = 1;
        this.calculateTotalPrice(event);
      })
    });
  }

  constructor(
    private route: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _cakeservice: CakeService,
    private _fb: FormBuilder,
    private _authseervice: AuthService,
    private snackbar: MatSnackBar
  ) {}

  calculateTotalPrice(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseFloat(inputElement.value);

    if (quantity < 1) {
      this.isBlankQuantity = true; // Show the error message
      this.snackbar.open('Quantity must be greater than or equal to 1', 'Dismiss', { verticalPosition: 'top', duration: 3000 });
      inputElement.value = '1'; // Reset the input value to 1
    } else {
      this.isBlankQuantity = false; // Hide the error message
      this.selectedQuantity = quantity;
      this.totalPrice = this.selectedQuantity * +this.cake.price;
    }
  }

  addToCart() {
    console.log('addToCart() called');

    if (this._authseervice.isLoggedIn) {
      console.log('User is logged in');

      if (this.selectedQuantity <= 0 || !this.selectedQuantity) {
        this.isBlankQuantity = true; // Show the error message
        return; // Exit the function
      }

      const uniqid = Math.random().toString(36).substr(2, 9);
      // Create the cart item
      const cartItem = {
        cakeId: uniqid,
        itemName: this.cake.image,
        quantity: this.selectedQuantity,
        totalPrice: this.totalPrice
      };

      const userId = this._authseervice.currentUser?.id;

      if (userId) {
        this._cakeservice.addItemToUserCart(userId, cartItem).subscribe(
          () => {
            this.snackbar.open('Item added to cart successfully', 'Dismiss', { verticalPosition: 'top', duration: 3000 });
          },
          (error) => {
            console.error('Error adding item to cart:', error);
          }
        );
      } else {
        console.log('User ID is undefined');
      }
    } else {
      console.log('User is not logged in');
      this.route.navigate(['/login']);
    }
  }

  checkIfUserIsLoggedIn(): boolean {
    // Implement your authentication logic to check if the user is logged in.
    // Return true if logged in, false otherwise.
    return false; // Replace with your authentication check.
  }
}
