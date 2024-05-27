import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule
 } from '@angular/common/http';
 import { CookieService } from 'ngx-cookie-service';
 import { NgxPaginationModule } from 'ngx-pagination';
 import { ToastService, AngularToastifyModule } from 'angular-toastify';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { MatDialogModule } from '@angular/material/dialog';
 import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
import { AdminProductCreateComponent } from './admin/admin-product-create/admin-product-create.component';
import { AdminProductUpdateComponent } from './admin/admin-product-update/admin-product-update.component';
import { AdminProductOptionModalComponent } from './admin/admin-product-option-modal/admin-product-option-modal.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminCateggoryComponent } from './admin/admin-categgory/admin-categgory.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminCategoryUpdateComponent } from './admin/admin-category-update/admin-category-update.component';
import { AdminCategoryCreateComponent } from './admin/admin-category-create/admin-category-create.component';
import { AdminNewsCreateComponent } from './admin/admin-news-create/admin-news-create.component';
import { AdminNewsUpdateComponent } from './admin/admin-news-update/admin-news-update.component';
import { AdminProductDetailComponent } from './admin/admin-product-detail/admin-product-detail.component';
import { AdminNewsDetailComponent } from './admin/admin-news-detail/admin-news-detail.component';
import { AdminCategoryDetailComponent } from './admin/admin-category-detail/admin-category-detail.component';
import { AdminUserDetailComponent } from './admin/admin-user-detail/admin-user-detail.component';
import { AdminUserUpdateComponent } from './admin/admin-user-update/admin-user-update.component';


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
    AdminProductCreateComponent,
    AdminProductUpdateComponent,
    AdminProductOptionModalComponent,
    AdminNewsComponent,
    AdminCateggoryComponent,
    AdminUserComponent,
    AdminOrderComponent,
    AdminProductComponent,
    AdminCategoryUpdateComponent,
    AdminCategoryCreateComponent,
    AdminNewsCreateComponent,
    AdminNewsUpdateComponent,
    AdminProductDetailComponent,
    AdminNewsDetailComponent,
    AdminCategoryDetailComponent,
    AdminUserDetailComponent,
    AdminUserUpdateComponent
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
    FontAwesomeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    CKEditorModule
  ],
  providers: [CookieService,ToastService,DialogService,DynamicDialogRef,ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
