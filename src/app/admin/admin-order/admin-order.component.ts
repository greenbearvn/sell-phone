import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { AdminOrderService } from 'src/app/services/admin/order/admin-order.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css', '../assets/css/main.css']
})
export class AdminOrderComponent {
  constructor(
    private adminOrderService: AdminOrderService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
  ) { }

  order: any;
  token: any;
  p: number = 1;
  itemPerPage: number = 10;

  ngOnInit() {
    this.getToken();
    this.getAllOrder();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  getAllOrder() {
    this.adminOrderService.getAllByAdmin(this.token, null, null).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.order = data.data;
      }
    });
  }

  formatCurrencyVND(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  getBadgeClassPayment(paymentId: string): string {
    const classMap: { [key: string]: string } = {
      1: 'bg-info',
      2: 'bg-success',
      3: 'bg-success',
      4: 'bg-warning',
    };
    return classMap[paymentId] || 'badge-default';
  }

  getBadgeClassOrder(statusId: string): string {
    const classMap: { [key: string]: string } = {
      1: 'bg-warning',
      2: 'bg-secondary',
      3: 'bg-info',
      4: 'bg-success',
      5: 'bg-danger',
    };
    return classMap[statusId] || 'badge-default';
  }
}
