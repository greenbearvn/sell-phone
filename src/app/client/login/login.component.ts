import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/client/login/login-service.service';
import { LoginDTO } from 'src/app/dto/LoginDTO';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
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
    '../assets/login/log.css',
    '../assets/login/log.scss']
})
export class LoginComponent {

  constructor(
    private loginService: LoginServiceService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private router: Router
  ) { }

  loginData: LoginDTO = {
    account: '',
    password: ''
  }

  data: any;

  token: any;

  ngOnInit() {
    // console.log(this.token);
    // this.getAllUser();
  }

  login() {
    console.log(this.loginData);
    this.loginService.login(this.loginData).subscribe((data:any) => {
      this.data = data;
      if (this.data.status === "SUCCESS") {
        this.toastService.success("Đăng nhập thành công");
        this.token = this.data.data.accessToken;
        console.log(this.token);
        this.cookieService.set('jwt_token', this.token);
       

        if(data.data.authorities[0]?.authority === "ROLE_ADMIN"){
          this.router.navigate(['/admin/home'])
        }
        else{
          this.router.navigate(['/'])
        }
      }
      else {
        this.toastService.error("Sai tài khoản hoặc mật khẩu");
        this.toastService.error("Đăng nhập không thành công!!!");
      }

    });
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
    console.log(this.token);
  }

  // getAllUser(){
  //   this.loginService.getUsers(this.token).subscribe((data) => {
  //     this.data = data;
  //     console.log(this.data);
  //   });
  // }

}
