import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { AdminOrderService } from 'src/app/services/admin/order/admin-order.service';
import { AdminOrderStatusService } from 'src/app/services/admin/order/admin-order-status.service';
import { AdminPaymentTypeService } from 'src/app/services/admin/payment-type/admin-payment-type.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderReq } from 'src/app/dto/OrderReq';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.css', '../assets/css/main.css']
})
export class AdminOrderUpdateComponent {
  orderId: any;
  paymentType: any;
  orderStatus: any;
  token: any;

  order: Order = {
    id: '',
    orderCode: '',
    userId: '',
    customerName: '',
    phone: '',
    address: '',
    note: '',
    shippingFee: '',
    originalPrice: '',
    netPriceTotal: '',
    orderStatusId: '',
    orderStatusName: '',
    paymentStatus: '',
    paymentTypeId: '',
    paymentTypeName: ''
  }

  requestUpdate: OrderReq = {
    statusId: ''
  }

  constructor(
    private adminOrderService: AdminOrderService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private adminOrderStatusService: AdminOrderStatusService,
    private adminPaymentTypeService: AdminPaymentTypeService,
    private route: ActivatedRoute,) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.orderId = Number(routeParams.get('id'));

    this.getToken();
    this.getAllOrderStatus();
    this.getAllPaymentType();
    this.detail();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  detail() {
    this.adminOrderService.getOrderById(this.orderId, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.order = data.data;
      }
    });
  }

  onSubmit(myForm: NgForm) {
    this.requestUpdate.statusId = this.order.orderStatusId;
    this.update();
  }


  update() {
    this.adminOrderService.update(this.orderId, this.requestUpdate, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Cập nhật trạng thái đơn hàng thành công!")
      }
    });
  }

  getAllOrderStatus() {
    this.adminOrderStatusService.getAll(this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.orderStatus = data.data;
      }
    });
  }

  getAllPaymentType() {
    this.adminPaymentTypeService.getAll(this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.paymentType = data.data;
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
}
