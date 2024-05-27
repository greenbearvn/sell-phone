import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import { AdminUserService } from 'src/app/services/admin/user/admin-user.service';
import { ActivatedRoute } from '@angular/router';
import { UserReq } from 'src/app/dto/UserReq';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.css', '../assets/css/main.css']
})
export class AdminUserUpdateComponent {
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

  requestUpdate: UserReq = {
    accountNonExpired: '',
    accountNonLocked: '',
    enabled: '',
    roleName: ''
  }

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

  onSubmit(myForm: NgForm) {
    this.requestUpdate.accountNonExpired = this.object.accountNonExpired;
    this.requestUpdate.accountNonLocked = this.object.accountNonLocked;
    this.requestUpdate.enabled = this.object.enabled;
    this.requestUpdate.roleName = this.object.roleName;

    this.adminUserService.updateByAdmin(this.id, this.requestUpdate, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Cập nhật thành công");
      }
    });
  }

}
