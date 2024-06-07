import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginServiceService } from 'src/app/services/client/login/login-service.service';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientComponent } from '../client.component';
import { UserService } from 'src/app/services/client/user/user.service';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';

@Component({
  selector: 'app-user-infor',
  templateUrl: './user-infor.component.html',
  styleUrls: ['./user-infor.component.css',
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
    '../assets/user-infor/members.scss']
})
export class UserInforComponent {

  constructor(
    private cookieService: CookieService,
    private loginService: LoginServiceService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private clientComponent: ClientComponent,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
  ) { this.formData = new FormData() }

  token: any;
  user: any;
  imageUrl: any = '';
  formData: FormData;

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  ngOnInit() {
    this.getToken();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.loginService.currentUser(this.token).subscribe((data) => {
      if (data.status === "SUCCESS") {
        this.user = data.data;
        this.imageUrl = this.user.avatar;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageUrl = this.user.avatar;
    }
  }

  checkUpdateUser() {
    try {
      this.loadingOverlayServiceService.show();
      console.log(this.user);
      this.formData = new FormData();
      const fileInput = document.getElementById('uploadfile') as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        this.formData.append('avatar', file);
      }
      this.formData.append('fullName', this.user.fullName);
      this.formData.append('username', this.user.username);
      this.formData.append('email', this.user.email);
      this.formData.append('phone', this.user.phone);
      this.formData.append('birthday', this.user.birthday);
      this.formData.append('gender', this.user.gender);

      this.userService.updateUser(this.token, this.formData).subscribe((data) => {
        if (data) {
          this.toastService.success("Cập nhật thành công");
        }
        this.loadingOverlayServiceService.hide();
      },
        (error) => {
          this.loadingOverlayServiceService.hide();
          this.toastService.error(error.error.message);
        });
    } catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
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

}
