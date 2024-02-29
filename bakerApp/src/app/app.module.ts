import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { CakeCardComponent } from './cake-card/cake-card.component';
import { ChipFilterComponent } from './chip-filter/chip-filter.component';
import { CakeViewComponent } from './cake-view/cake-view.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import {MatSelectModule} from '@angular/material/select';

import { CartViewComponent } from './cart-view/cart-view.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { AdmindasboardComponent } from './admindasboard/admindasboard.component';
import { AdminOredersViewComponent } from './admin-oreders-view/admin-oreders-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
    CakeCardComponent,
    CakeViewComponent,
    NavBarComponent,
    ChipFilterComponent,
    SearchComponent,
    LoginComponent,
    RegisterUserComponent,
  
    CartViewComponent,
    OrdersViewComponent,
    AdmindasboardComponent,
    AdminOredersViewComponent,
    ProfileViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    NgbCarouselModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSnackBarModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule
   
  
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
