import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { ClientHomeComponent } from './client/home/home.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { ClientComponent } from './client/client.component';
import { ClientRoutingModule } from './client/client-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';

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

import { DetailInforProductComponent } from './client/detail-infor-product/detail-infor-product.component';
import { DetailNewsComponent } from './client/detail-news/detail-news.component';
import { CategoryComponent } from './client/category/category.component';
import { RegisterComponent } from './client/register/register.component';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';

import { AdminUserDetailComponent } from './admin/admin-user-detail/admin-user-detail.component';
import { AdminUserUpdateComponent } from './admin/admin-user-update/admin-user-update.component';
import { AdminOrderUpdateComponent } from './admin/admin-order-update/admin-order-update.component';
import { AdminOrderDetailComponent } from './admin/admin-order-detail/admin-order-detail.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserInforComponent } from './client/user-infor/user-infor.component';
import { UserAddressComponent } from './client/user-address/user-address.component';
import { AdminReportComponent } from './admin/admin-report/admin-report.component';
import { AdminSlideComponent } from './admin/admin-slide/admin-slide.component';
import { PaymentComponent } from './client/payment/payment.component';
import { AdminSlideCreateComponent } from './admin/admin-slide-create/admin-slide-create.component';
import { AdminSlideUpdateComponent } from './admin/admin-slide-update/admin-slide-update.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHomeComponent,
    ClientComponent,
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
    ClientHomeComponent,
    DetailInforProductComponent,
    DetailNewsComponent,
    CategoryComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AdminUserDetailComponent,
    AdminUserUpdateComponent,
    AdminOrderUpdateComponent,
    AdminOrderDetailComponent,
    AdminDashboardComponent,
    UserInforComponent,
    UserAddressComponent,
    AdminReportComponent,
    AdminSlideComponent,
    PaymentComponent,
    AdminSlideCreateComponent,
    AdminSlideUpdateComponent
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
    CKEditorModule,
    CommonModule,
    CarouselModule.forRoot(),
  ],
  providers: [CookieService, ToastService, DialogService, DynamicDialogRef, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
