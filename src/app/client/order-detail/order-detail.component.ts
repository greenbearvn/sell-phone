import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from 'src/app/services/client/payment/payment.service';
import { ToastService } from 'angular-toastify';
import { ActivatedRoute } from '@angular/router';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
  ) { }

  token: any;
  id: any;
  order: any;
  orderDetail: any;

  ngOnInit() {
    this.getToken();
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.getOrder();
    this.getOrderDetail();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
    console.log(this.token);
  }

  getOrder() {
    try {
      this.loadingOverlayServiceService.show();
      this.paymentService.getOrderById(this.token, this.id).subscribe((data: any) => {
        this.loadingOverlayServiceService.hide();
        if (data.status === 'SUCCESS') {
          this.order = data.data;
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

  getOrderDetail() {
    try {
      this.loadingOverlayServiceService.show();
      this.paymentService.getOrderDetail(this.token, this.id).subscribe((data: any) => {
        this.loadingOverlayServiceService.hide();
        if (data.status === 'SUCCESS') {
          this.orderDetail = data.data;
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

  formatCurrencyVND(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}
