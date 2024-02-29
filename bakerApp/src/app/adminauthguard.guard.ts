import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AdminAuthGuard is checking...');
    console.log('Current user:', this.authService.currentUser);
    console.log('User role:', this.authService.currentUser.user_role);
    if (this.authService.isLoggedIn && this.authService.currentUser.user_role === 'admin') {
      console.log('Admin is authorized.');
      return true;
    } else {
      console.log('Admin is not authorized, redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
