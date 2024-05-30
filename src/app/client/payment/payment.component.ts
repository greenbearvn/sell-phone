import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from 'src/app/services/client/payment/payment.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(
    private paymentService: PaymentService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {}

  address: any;
  addressChoice: any;
  token: any;

  cartData: any[] = [];

  totalMoney: any;

  infor: any = {
    customerName: '',
    address: '',
    phone: '',
    orderProductRequestDtos: [],
    note: '',
    shippingFee: 0,
    paymentTypeId: 1,
  };

  appendOptions() {
    for (let item of this.cartData) {
      this.infor.orderProductRequestDtos.push({
        productOptionId: item.productOptionDto.id,
        quantity: item.quantity,
      });
    }
  }

  ngOnInit() {
    this.getToken();
    this.cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    this.appendOptions();
    this.infor.shippingFee = 0;
    this.infor.paymentTypeId = 1;
    localStorage.clear();

    this.getAddressCurrent();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
    console.log(this.token);
  }

  getAddressCurrent() {
    this.paymentService
      .getAddressCurrentUser(this.token)
      .subscribe((data: any) => {
        this.address = data.data;
      });
  }

  calTotalMoney() {
    this.totalMoney = 0; // Initialize totalMoney to zero before summing up
    for (let i of this.cartData) {
      // Use 'of' instead of 'in' to iterate over values
      this.totalMoney += i.productOptionDto.newPrice * i.quantity;
    }
  }

  formatCurrencyVND(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  payment() {

    console.log(this.infor)
    this.paymentService
      .payment(this.token, this.infor)
      .subscribe((data: any) => {
        this.toastService.success("Quý khách đã mua hàng thành công!!!")
      });
  }
}
