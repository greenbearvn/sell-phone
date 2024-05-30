import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from 'src/app/services/client/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(
    private paymentService: PaymentService,
    private cookieService: CookieService,
  ) { }

  address:any;
  addressChoice:any;
  token:any;

  cartData: any[] = [];

  totalMoney:any;

  infor:any;


 paymentData:any ={
  "addressId": 1,
  "orderProductRequestDtos": [
    {
      "productOptionId": 1,
      "quantity": 2
    },
    {
      "productOptionId": 3,
      "quantity": 1
    }
  ],
  "note": "This is a sample note.",
  "shippingFee": 0,
  "paymentTypeId": 1
}

appendOptions() {
  for (let item of this.cartData) {
    this.infor.orderProductRequestDtos.push({ 
      productOptionDto: item.productOptionDto,
      quantity: item.quantity
    });
  }
}


  ngOnInit() {
    this.getToken();
    this.cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    this.appendOptions();
    this.infor.shippingFee = 0;
    this.infor.paymentTypeId  = 1;
    localStorage.clear();

    this.getAddressCurrent();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
    console.log(this.token);
  }

  getAddressCurrent(){
    this.paymentService.getAddressCurrentUser(this.token).subscribe((data:any) => {
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
      maximumFractionDigits: 0
    });
  }


  payment() {
    this.paymentService.payment(this.token,this.infor).subscribe((data:any) => {
      this.address = data.data;
      
    });
  }

}
