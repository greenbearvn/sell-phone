import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginServiceService } from 'src/app/services/client/login/login-service.service';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private cookieService: CookieService, private loginService:LoginServiceService,private toastService:ToastService,private router: Router){}

  token:any;
  user:any;

  getToken(){
    this.token = this.cookieService.get('jwt_token');
  }

  ngOnInit(){

   
    this.getToken();
    this.getCurrentUser();
   
  }

  getCurrentUser(){
    this.loginService.currentUser(this.token).subscribe((data) => {

      if(data.status === "SUCCESS"){
        this.user = data.data;
      }
      
    });
  }

  logout(){
    this.token = this.cookieService.delete('jwt_token');
    this.toastService.success("Đăng xuất thành công");
    this.router.navigate(['/']);

  }

  deleteBtn(){

    Swal.fire({
      title: 'Bạn muốn đăng xuất?',
      // text: 'Một khi bạn xóa, bạn sẽ không thể khôi phục lại thông tin này!',
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
