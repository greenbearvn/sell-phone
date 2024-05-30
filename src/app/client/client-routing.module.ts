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


const routes: Routes = [
  {
    path:'',
    component: ClientComponent,
    children:[
      {path:'', component: ClientHomeComponent},
      {path:'dien-thoai/xem-chi-tiet/:id', component: ClientDetailComponent},
      {path:'cart', component: CartComponent},
      {path:'tin-tuc', component: ClientNewsComponent},
      {path:'tin-tuc/:id', component: DetailNewsComponent},
      {path:'login', component: LoginComponent},
      {path:'dien-thoai', component: CategoryComponent},
      {path:'register', component: RegisterComponent},
      {path:'forgot-password', component: ForgotPasswordComponent},
      {path:'trang-ca-nhan', component: UserInforComponent},
      {path:'dia-chi', component: UserAddressComponent},
      {path:'thanh-toan', component: PaymentComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
