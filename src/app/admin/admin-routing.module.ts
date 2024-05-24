import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './home/home.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminProductCreateComponent } from './admin-product-create/admin-product-create.component';
import { AdminProductUpdateComponent } from './admin-product-update/admin-product-update.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminCateggoryComponent } from './admin-categgory/admin-categgory.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminCategoryUpdateComponent } from './admin-category-update/admin-category-update.component';
import { AdminCategoryCreateComponent } from './admin-category-create/admin-category-create.component';
import { AdminProductDetailComponent } from './admin-product-detail/admin-product-detail.component';
import { AdminNewsCreateComponent } from './admin-news-create/admin-news-create.component';
import { AdminNewsUpdateComponent } from './admin-news-update/admin-news-update.component';
import { AdminNewsDetailComponent } from './admin-news-detail/admin-news-detail.component';
import { AdminCategoryDetailComponent } from './admin-category-detail/admin-category-detail.component';


const routes: Routes = [
  {
    path:'admin',
    component: AdminComponent,
    children:[
      {path:'product', component: AdminProductComponent},
      { path:'product/create', component: AdminProductCreateComponent},
      { path:'product/update/:id', component: AdminProductUpdateComponent},
      { path:'product/detail/:id', component: AdminProductDetailComponent},
      { path:'news', component: AdminNewsComponent},
      { path:'news/create', component: AdminNewsCreateComponent},
      { path:'news/update/:id', component: AdminNewsUpdateComponent},
      { path:'news/detail/:id', component: AdminNewsDetailComponent},
      { path:'category', component: AdminCateggoryComponent},
      { path:'category/create', component: AdminCategoryCreateComponent},
      { path:'category/update/:id', component: AdminCategoryUpdateComponent},
      { path:'category/detail/:id', component: AdminCategoryDetailComponent},
      { path:'user', component: AdminUserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
