import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './home/home.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { CartComponent } from './cart/cart.component';
import { ClientNewsComponent } from './client-news/client-news.component';
import { LoginComponent } from './login/login.component';
import { DetailNewsComponent } from './detail-news/detail-news.component';
import { CategoryComponent } from './category/category.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserInforComponent } from './user-infor/user-infor.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


const routes: Routes = [
  {
    path:'',
    component: ClientComponent,
    children:[
      {path:'', component: ClientHomeComponent},
      {path:'dien-thoai', component: CategoryComponent},
      {path:'dien-thoai/xem-chi-tiet/:id', component: ClientDetailComponent},
      {path:'gio-hang', component: CartComponent},

      {path:'tin-tuc', component: ClientNewsComponent},
      {path:'tin-tuc/xem-tin-tuc/:id', component: DetailNewsComponent},

      {path:'dang-nhap', component: LoginComponent},      
      {path:'dang-ky', component: RegisterComponent},
      {path:'quen-mat-khau', component: ForgotPasswordComponent},
      {path:'trang-ca-nhan', component: UserInforComponent},
      {path:'dia-chi', component: UserAddressComponent},

      {path:'dat-hang', component: PaymentComponent},
      {path:'don-hang/:id', component: OrderDetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
