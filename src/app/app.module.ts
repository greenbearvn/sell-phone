import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule
 } from '@angular/common/http';
 import { CookieService } from 'ngx-cookie-service';
 import { NgxPaginationModule } from 'ngx-pagination';
 import { ToastService, AngularToastifyModule } from 'angular-toastify';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { ClientComponent } from './client/client.component';
import { ClientRoutingModule } from './client/client-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { ClientNavbarComponent } from './client/layouts/client-navbar/client-navbar.component';
import { ClientHeaderComponent } from './client/layouts/client-header/client-header.component';
import { ClientFooterComponent } from './client/layouts/client-footer/client-footer.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { CartComponent } from './client/cart/cart.component';
import { AdminHeaderComponent } from './admin/layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/layout/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './admin/layout/admin-sidebar/admin-sidebar.component';
import { LoginComponent } from './client/login/login.component';
import { FormsModule } from '@angular/forms';
import { ClientNewsComponent } from './client/client-news/client-news.component';

import { AdminProductComponent } from './admin/admin-product/admin-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHomeComponent,
    ClientComponent,
    ClientNavbarComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    ClientDetailComponent,
    CartComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    LoginComponent,
    ClientNewsComponent,
    AdminProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientRoutingModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularToastifyModule,
    FontAwesomeModule
  ],
  providers: [CookieService,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
