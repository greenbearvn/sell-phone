import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { ActivatedRoute } from '@angular/router';
import { AdminUserService } from 'src/app/services/admin/user/admin-user.service';
import { AdminOrderService } from 'src/app/services/admin/order/admin-order.service';
import { AdminProductService } from 'src/app/services/admin/product/admin-product.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css', '../assets/css/main.css']
})
export class AdminReportComponent {
  token: any;
  users: any;
  orders: any;
  products: any;
  userCount: number = 0;
  orderCount: number = 0;
  productCount: number = 0;

  constructor(
    private cookieService: CookieService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private adminUserService: AdminUserService,
    private adminOrderService: AdminOrderService,
    private adminProductService: AdminProductService,
  ) { }

  ngOnInit() {
    this.getToken();
    this.getNumberUser();
    this.getNumberOrder();
    this.getNumberProduct();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  getNumberUser() {
    this.adminUserService.getAll(this.token).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.users = data.data;
        this.userCount = this.users.length;
      }
    });
  }

  getNumberOrder() {
    this.adminOrderService.getAllByAdmin(this.token, null, null).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.orders = data.data;
        this.orderCount = this.orders.length;
      }
    });
  }

  getNumberProduct() {
    this.adminProductService.getProducts(this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.products = data.data;

        for (let i = 0; i < this.products.length; i++) {
          for (let j = 0; j < this.products[i].productOptionDtos.length; i++) {
            this.productCount += this.products[i].productOptionDtos[j].quantity;
          }
        }
      }
    });
  }
}
