import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from 'src/app/services/client/payment/payment.service';
import { ToastService } from 'angular-toastify';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
  ) { }

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
    paymentTypeId: 5,
  };

  dataMomo: any;

  appendOptions() {
    for (let item of this.cartData) {
      this.infor.orderProductRequestDtos.push({
        productOptionId: item.productOptionDto.id,
        quantity: item.quantity,
      });
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.getToken();
    var currentURL = window.location.href;
    this.checkPayemntStatus(currentURL);
        
    this.cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calTotalMoney();
    this.appendOptions();
    this.infor.shippingFee = 0;
    this.getAddressCurrent();
  }

  checkPayemntStatus(currentURL: any) {
    var urlParams = new URLSearchParams(new URL(currentURL).search);

    // MOMO
    if (currentURL.includes('MOMO')) {
      try {
        var orderId = urlParams.get('orderId');

        var dataCheck: any = {
          orderId: orderId
        };

        this.loadingOverlayServiceService.show();
        this.paymentService.checkPaymentMomo(this.token, dataCheck).subscribe((data: any) => {

          this.loadingOverlayServiceService.hide();

          let dataOrder = localStorage.getItem('dataOrder');
          if (dataOrder) {
            this.infor = JSON.parse(dataOrder);
          }
          this.callPayment();
        },
          (error) => {
            this.loadingOverlayServiceService.hide();
            this.toastService.error(error);
          }
        );
      } catch (error) {
        this.loadingOverlayServiceService.hide();
        this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
      }
    } else {
      // ZALO
      if (currentURL.includes('appid') && currentURL.includes('apptransid')) {
        this.loadingOverlayServiceService.show();

        var app_id = urlParams.get('appid');
        var app_trans_id = urlParams.get('apptransid');
        fetch('http://localhost:3000/zalo/check-status-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "app_id": app_id,
            "app_trans_id": app_trans_id
          })
        })
          .then(response => response.json())
          .then(async data => {
            if (data.return_code == 3) {
              this.toastService.error("Thanh toán qua ZaloPay thất bại!");
            }
            else {
              if (data.return_code == 2) {
                this.toastService.error("Thanh toán Zalopay hết hạn! VUi lòng tạo giao dịch mới!");
              }
              else {
                if (data.return_code == 1) {
                  let dataOrder = localStorage.getItem('dataOrder');
                  if (dataOrder) {
                    this.infor = JSON.parse(dataOrder);
                  }
                  this.callPayment();
                }
                else {
                  this.toastService.error("Thanh toán qua ZaloPay thất bại!");
                }
              }
            }
            this.loadingOverlayServiceService.hide();
          }).catch(error => {
            this.loadingOverlayServiceService.hide();
            this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
          });
      } else {
        // PAYOS
        if (currentURL.includes('cancel') && currentURL.includes('status')) {
          try {            
            this.loadingOverlayServiceService.show();
            var cancel = urlParams.get('cancel');
            var status = urlParams.get('status');

            if (cancel == 'false' && status == 'PAID') {              
              let dataOrder = localStorage.getItem('dataOrder');
              if (dataOrder) {
                this.infor = JSON.parse(dataOrder);
              }
              this.callPayment();
            }
            else {
              if (cancel == 'true' || status == 'CANCELLED ') {                              
                this.toastService.error("Đã hủy thanh toán qua PayOS!");                
              } else {
                this.toastService.error("Thanh toán qua PayOS thất bại!");
              }
            }
            this.loadingOverlayServiceService.hide();
          } catch (error) {
            this.loadingOverlayServiceService.hide();
            this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
          }
        }
      }
    }
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
    console.log("Total: " + this.totalMoney);

  }

  formatCurrencyVND(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  async payment() {
    console.log("------------: " + this.infor.paymentTypeId);
    if (this.infor.customerName && this.infor.phone && this.infor.address) {
      localStorage.setItem('dataOrder', JSON.stringify(this.infor));
      if (this.infor.paymentTypeId == 5) {
        this.callPayment();
      }
      else {
        if (this.infor.paymentTypeId == 2) {
          try {
            this.dataMomo = {
              orderInfo: this.totalMoney,
              amount: this.totalMoney,
              extraData: "",
              orderGroupId: ""
            };
            this.loadingOverlayServiceService.show();
            this.paymentService.createPaymentMomo(this.token, this.dataMomo).subscribe((data: any) => {

              this.loadingOverlayServiceService.hide();
              console.log(data.payUrl);

              window.location.href = data.payUrl;
            },
              (error) => {
                this.loadingOverlayServiceService.hide();
                this.toastService.error(error);
              }
            );
          } catch (error) {
            this.loadingOverlayServiceService.hide();
            this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
          }

        } else {
          if (this.infor.paymentTypeId == 3) {
            try {
              this.loadingOverlayServiceService.show();
              const response2 = await fetch('http://localhost:3000/zalo/payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "app_user": "user123",
                  "amount": this.totalMoney,
                  "description": "Mobile City order",
                  "bank_code": ""
                }),
              });

              if ((response2).ok) {
                const data = await response2.json();
                window.location.href = data.order_url;
              } else {
                this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
              }
              this.loadingOverlayServiceService.hide();
            } catch (error) {
              this.loadingOverlayServiceService.hide();
              this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
            }

          } else {
            if (this.infor.paymentTypeId == 4) {
              const response4 = await fetch('http://localhost:3000/create-payment-link', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount: this.totalMoney,
                  description: "Thanh toan don hang",
                  orderCode: new Date().getTime(),
                })
              });
              if (response4.ok) {
                const data4 = await response4.json();
                window.location.href = data4.checkoutUrl;
              } else {
                this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
              }
            }
          }
        }
      }
    } else {
      this.toastService.error("Các trường thông tin không thể để trống!");
    }
  }

  callPayment() {
    try {
      console.log(this.infor);
      this.loadingOverlayServiceService.show();
      this.paymentService.createOrder(this.token, this.infor).subscribe((data: any) => {
        this.loadingOverlayServiceService.hide();
        if (data.status === 'SUCCESS') {
          this.toastService.success("Quý khách đã mua hàng thành công!")

          var orderId = data.data.id;
          setTimeout(() => {
            window.location.href = '/don-hang/' + orderId;
          }, 2000);
        }
      },
        (error) => {
          this.loadingOverlayServiceService.hide();
          this.toastService.error(error.error.message);
        }
      );
    }
    catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }
}
