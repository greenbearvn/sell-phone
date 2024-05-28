import { Component } from '@angular/core';
import { UserReq } from 'src/app/dto/UserReq';
import { LoginServiceService } from 'src/app/services/client/login/login-service.service';
import { ToastService } from 'angular-toastify';
import { UserRegister } from 'src/app/dto/UserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
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
    '../assets/login/log.scss',
  ],
})
export class RegisterComponent {
  constructor(
    private userService: LoginServiceService,
    private toastService: ToastService
  ) {}

  res: any;
  userReq: UserRegister = {
    phone: '',
    username: '',
    password: '',
    email: '',
  };

  register() {
    this.userService.register(this.userReq).subscribe((data) => {
      this.res = data;
      if (this.res.status === 'SUCCESS') {
        this.toastService.success('Đăng ký tài khoản thành công');
      }
      else{
        this.toastService.success('Đã xảy ra lỗi vui lòng thử lại sau');
      }
    });
  }
}
