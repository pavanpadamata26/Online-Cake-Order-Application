import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  userData:any;
 constructor(public _authservice:AuthService){
  this.isLoggedIn = this._authservice.isLoggedIn;
  console.log("user loggedin");
  this.userData = this._authservice.currentUser;
 console.log(this.userData)
 }
 logOut(){
  this._authservice.logout();
 }

}
