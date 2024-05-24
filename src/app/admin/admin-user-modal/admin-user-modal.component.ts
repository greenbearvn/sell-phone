import { Component } from '@angular/core';

import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';


import { AdminUserService } from 'src/app/services/admin/user/admin-user.service';
import { UserReq } from 'src/app/dto/UserReq';

@Component({
  selector: 'app-admin-user-modal',
  templateUrl: './admin-user-modal.component.html',
  styleUrls: ['./admin-user-modal.component.css','../assets/css/main.css']
})
export class AdminUserModalComponent {


  constructor(
    public ref: DynamicDialogRef, 
    private dialogService: DialogService,
    private adminUserService: AdminUserService,
    private cookieService: CookieService,
    private toastService: ToastService,
  ) {
      this.instance = this.dialogService.getInstance(this.ref);
  }

  token:any;
  type:any;
  id:any;
  instance: DynamicDialogComponent | undefined;

  object: UserReq = {
      phone: '',
      username: '',
      password: '',
      email: ''
  };

  ngOnInit() {
    if (this.instance && this.instance.data) {
        this.id = this.instance.data['id'];
        this.type = this.instance.data['type'];
    }
    this.getToken();
   

    if(this.type == 'edit' ){
      this.detail();
    }  
  }


  getToken(){
    this.token = this.cookieService.get('jwt_token');
  }

  detail() {
    this.adminUserService.getDetail(this.id, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.object = data.data;
        console.log(this.object);
      }
    });
  }

  checkSubmit(){
    if(this.type == 'create'){
      this.create();

    }
    else{
        this.update();
    }
  }



  create(){
    this.adminUserService.create(this.object,this.token).subscribe((data:any) => {

      if(data.status === 'SUCCESS'){
        
        this.toastService.success("Thêm  thành công!!!")

      }
    });
  }

  update(){
    this.adminUserService.update(this.id,this.object,this.token).subscribe((data:any) => {

      if(data.status === 'SUCCESS'){
        
        this.toastService.success("Cập nhật thành công!!!")

      }
    });
  }

}
