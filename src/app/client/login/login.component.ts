import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/client/login/login-service.service';
import { LoginDTO } from 'src/app/dto/LoginDTO';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../assets/templates/default/css/jquery.lazyloadxt.fadein.min.css',
    '../assets/templates/default/css/font-awesome.min.css',
    // '../assets/templates/default/css/bootstraphome.css',
    '../assets/modules/home/assets/css/swiper-bundle.min.css',
    '../assets/modules/home/assets/css/default.css',
    '../assets/blocks/mainmenu/assets/css/icon.css',
    '../assets/blocks/slideshow/assets/css/default.css',
    '../assets/blocks/video/assets/css/video.css',
    '../assets/libraries/jquery/owlcarousel/assets/owl.carousel.min.css',
    '../assets/libraries/jquery/owlcarousel/assets/owl.theme.default.min.css',
    '../assets/login/log.css',
    '../assets/login/log.scss']
})
export class LoginComponent {
  constructor(
    private loginService: LoginServiceService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private router: Router,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
  ) { }

  loginData: LoginDTO = {
    account: '',
    password: ''
  }
  data: any;
  token: any;

  ngOnInit() {
    this.token = null;
    this.getToken();
    console.log("Token: " + this.token);

    // if (this.token != null && this.token != '') {
    //   window.location.href = '/home';
    // }
  }

  login() {
    try {
      this.loadingOverlayServiceService.show();
      this.loginService.login(this.loginData).subscribe((response: any) => {
        this.loadingOverlayServiceService.hide();
        this.data = response;
        if (this.data.status === "SUCCESS") {
          this.toastService.success("Đăng nhập thành công");         
          this.token = this.data.data.accessToken;
          this.cookieService.set('jwt_token', this.token);
          if (response.data.authorities[0]?.authority === "ROLE_ADMIN") {
            window.location.href = '/admin/home';
          }
          else {
            window.location.href = '/';
          }
        }
        this.loadingOverlayServiceService.hide();
      },
        (error) => {
          this.loadingOverlayServiceService.hide();
          this.toastService.error(error.error.message);
        }
      );
    } catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }
}
