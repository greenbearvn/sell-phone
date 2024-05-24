import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminUserService } from 'src/app/services/admin/user/admin-user.service';
import { AdminUserModalComponent } from '../admin-user-modal/admin-user-modal.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css','../assets/css/main.css']
})
export class AdminUserComponent {

  constructor(
    private _userService: AdminUserService,
     private cookieService: CookieService,
     private toastService: ToastService,
     private dialogService: DialogService, 
     private ref: DynamicDialogRef,
   ) { }

   list:any;
   token:any;
   p: number = 1;
   itemPerPage:number=10;

   ngOnInit(){
    this.getToken();
    this.getList();
  }

   getToken(){
    this.token = this.cookieService.get('jwt_token');
  }


  openModal( id:any,type:any) {
    const dialogRef = this.dialogService.open(AdminUserModalComponent, {
      header:  type == 'create'? 'Thêm ' : 'Cập nhật ',
      modal: true,
      dismissableMask: true,
      width: '70%',
      data: {
        id: id,
        type: type
      }
    });
  
    dialogRef.onClose.subscribe(() => {
      this.getList();
    });
  }

  getList(){
    this._userService.getAll(this.token).subscribe((data) => {
      if(data.status === 'SUCCESS'){
        this.list = data.data;
      }
    });
  }

  delete(id:any){

    this._userService.delete(id,this.token).subscribe((data:any) => {
      if(data.status === 'SUCCESS'){
       this.toastService.success("Xóa người dùng thành công!!!");
       this.getList();
      }
    });
  }


}
