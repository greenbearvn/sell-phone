import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './home/home.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { CartComponent } from './cart/cart.component';
import { ClientNewsComponent } from './client-news/client-news.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',
    component: ClientComponent,
    children:[
      {path:'', component: ClientHomeComponent},
      {path:'product-detail/:id', component: ClientDetailComponent},
      {path:'cart', component: CartComponent},
      {path:'newsfeed', component: ClientNewsComponent},
      {path:'login', component: LoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
