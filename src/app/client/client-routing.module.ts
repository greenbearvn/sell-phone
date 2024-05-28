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


const routes: Routes = [
  {
    path:'',
    component: ClientComponent,
    children:[
      {path:'', component: ClientHomeComponent},
      {path:'product-detail/:id', component: ClientDetailComponent},
      {path:'cart', component: CartComponent},
      {path:'news', component: ClientNewsComponent},
      {path:'new/:id', component: DetailNewsComponent},
      {path:'login', component: LoginComponent},
      {path:'category', component: CategoryComponent},
      {path:'register', component: RegisterComponent},
      {path:'forgot-password', component: ForgotPasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
