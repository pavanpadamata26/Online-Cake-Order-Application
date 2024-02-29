import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeViewComponent } from './cake-view/cake-view.component';
import { CakeDetailViewComponent } from './cake-detail-view/cake-detail-view.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FunctionExpr } from '@angular/compiler';
import { CartViewComponent } from './cart-view/cart-view.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { AdmindasboardComponent } from './admindasboard/admindasboard.component';
import { AdminAuthGuard } from './adminauthguard.guard';
import { AdminOredersViewComponent } from './admin-oreders-view/admin-oreders-view.component';
import { cartViewGuard } from './cart-view.guard';
import { registerUserGuard } from './register-user.guard';
import { LoginGuard } from './login-guard.guard';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { registerGuard } from './register-guard.guard';


const routes: Routes = [
  {path:'',component:CakeViewComponent},
  
 
  {path:"cake-detail-view/:id",component:CakeDetailViewComponent},
  {path:"cake-view",component:CakeViewComponent},
{path:"login",component:LoginComponent,canDeactivate:[LoginGuard]},
{path:"register-user",component:RegisterUserComponent,canActivate:[ registerUserGuard],canDeactivate:[registerGuard]},
{path:"cart-view",component:CartViewComponent,canActivate:[cartViewGuard]},
{path:"orders-view",component:OrdersViewComponent},
{path:"orders",component:OrdersViewComponent},
{ path: 'admin', canActivate: [AdminAuthGuard], children: [
  { path: '', component: AdmindasboardComponent },
  { path: 'orders', component: AdminOredersViewComponent }
]},
{path:"profile-view",component:ProfileViewComponent}

// Admin Orders View

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
