import { AdminUserUpdateComponent } from './admin-user-update/admin-user-update.component';
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
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminOrderUpdateComponent } from './admin-order-update/admin-order-update.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminSlideComponent } from './admin-slide/admin-slide.component';
import { AdminSlideCreateComponent } from './admin-slide-create/admin-slide-create.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'home', component: AdminDashboardComponent },
      { path: 'report', component: AdminReportComponent },

      { path: 'product', component: AdminProductComponent },
      { path: 'product/create', component: AdminProductCreateComponent },
      { path: 'product/update/:id', component: AdminProductUpdateComponent },
      { path: 'product/detail/:id', component: AdminProductDetailComponent },

      { path: 'news', component: AdminNewsComponent },
      { path: 'news/create', component: AdminNewsCreateComponent },
      { path: 'news/update/:id', component: AdminNewsUpdateComponent },
      { path: 'news/detail/:id', component: AdminNewsDetailComponent },

      { path: 'category', component: AdminCateggoryComponent },
      { path: 'category/create', component: AdminCategoryCreateComponent },
      { path: 'category/update/:id', component: AdminCategoryUpdateComponent },
      { path: 'category/detail/:id', component: AdminCategoryDetailComponent },

      { path: 'user', component: AdminUserComponent },
      // { path:'user/create', component: AdminUserDetailComponent},
      { path: 'user/update/:id', component: AdminUserUpdateComponent },
      { path: 'user/detail/:id', component: AdminUserDetailComponent },

      { path: 'order', component: AdminOrderComponent },
      { path: 'order/update/:id', component: AdminOrderUpdateComponent },
      { path: 'order/detail/:id', component: AdminOrderDetailComponent },

      { path: 'slide', component: AdminSlideComponent },
      { path: 'slide/create', component: AdminSlideCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
