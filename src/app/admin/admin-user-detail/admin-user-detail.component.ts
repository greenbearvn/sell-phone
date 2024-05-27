import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import { AdminUserService } from 'src/app/services/admin/user/admin-user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../models/User';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css', '../assets/css/main.css']
})
export class AdminUserDetailComponent {
  formData: FormData;
  token: any;
  type: any;
  id: any;

  object: User = {
    username: '',
    fullName: '',
    gender: '',
    birthday: '',
    phone: '',
    email: '',
    avatar: '',
    accountNonExpired: '',
    accountNonLocked: '',
    enabled: '',
    roleName: '',
  };

  constructor(

    private adminUserService: AdminUserService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private route: ActivatedRoute,
  ) {
    this.formData = new FormData()
  }

  ngOnInit() {
    this.getToken();
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.detail();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  detail() {
    this.adminUserService.getDetail(this.id, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.object = data.data;
      }
    });
  }

}
