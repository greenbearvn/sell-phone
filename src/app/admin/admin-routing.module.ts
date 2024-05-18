import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './home/home.component';
import { AdminProductComponent } from './admin-product/admin-product.component';

const routes: Routes = [
  {
    path:'admin',
    component: AdminComponent,
    children:[
      {path:'product', component: AdminProductComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
