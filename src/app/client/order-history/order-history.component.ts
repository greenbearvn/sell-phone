import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientComponent } from '../client.component';
import { UserService } from 'src/app/services/client/user/user.service';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';
import { LoginServiceService } from 'src/app/services/client/login/login-service.service';
import { PaymentService } from 'src/app/services/client/payment/payment.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css',
    '../assets/templates/default/css/jquery.lazyloadxt.fadein.min.css',
    '../assets/templates/default/css/font-awesome.min.css',
    '../assets/templates/default/css/bootstraphome.css',
    '../assets/modules/home/assets/css/swiper-bundle.min.css',
    '../assets/modules/home/assets/css/default.css',
    '../assets/blocks/mainmenu/assets/css/icon.css',
    '../assets/blocks/slideshow/assets/css/default.css',
    '../assets/blocks/video/assets/css/video.css',
    '../assets/libraries/jquery/owlcarousel/assets/owl.carousel.min.css',
    '../assets/libraries/jquery/owlcarousel/assets/owl.theme.default.min.css',
    '../assets/blocks/search/assets/css/search_simple.css',
    '../assets/user-infor/members.css',
    '../assets/user-infor/members.scss'
  ]
})
export class OrderHistoryComponent {
  constructor(
    private cookieService: CookieService,
    private loginService: LoginServiceService,
    private toastService: ToastService,
    private router: Router,
    private clientComponent: ClientComponent,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
    private userService: UserService,
    private paymentService: PaymentService,
  ) { }

  token: any;
  orders: any;
  user: any;

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  ngOnInit() {
    this.getToken();
    this.getCurrentUser();
    this.getAllOrder();
  }

  getCurrentUser() {
    this.loginService.currentUser(this.token).subscribe((data) => {
      if (data.status === "SUCCESS") {
        this.user = data.data;
      }
    });
  }

  getAllOrder() {
    this.loadingOverlayServiceService.show();
    this.paymentService.getAllByUser(this.token).subscribe((data) => {
      if (data.status === "SUCCESS") {
        this.orders = data.data;
      }
      this.loadingOverlayServiceService.hide();
    },
      (error) => {
        this.loadingOverlayServiceService.hide();
        this.toastService.error(error.error.message);
      }
    );
  }

  logout() {
    this.token = null;
    this.cookieService.delete('jwt_token');
    localStorage.clear();
    this.clientComponent.countItemCart();
    this.toastService.success("Đăng xuất thành công");
    this.router.navigate(['\dang-nhap']);
  }

  deleteBtn() {
    Swal.fire({
      title: 'Bạn muốn đăng xuất?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
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
