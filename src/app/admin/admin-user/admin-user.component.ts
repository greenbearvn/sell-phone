import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminUserService } from 'src/app/services/admin/user/admin-user.service';
import Swal from 'sweetalert2';

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

  getList(){
    this._userService.getAll(this.token).subscribe((data) => {
      if(data.status === 'SUCCESS'){
        this.list = data.data;
      }
    });
  }

  confirmDeleteUser(id: any) {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Bạn có chắc chắn là muốn xóa người dùng này?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(id);
      }
    });
  }

  deleteUser(id:any){

    this._userService.delete(id,this.token).subscribe((data:any) => {
      if(data.status === 'SUCCESS'){
       this.toastService.success("Xóa người dùng thành công!!!");
       this.getList();
      }
    });
  }

  getFriendlyRoleName(roleName: string): string {
    const roleMap: { [key: string]: string } = {
      'ROLE_ADMIN': 'ADMIN',
      'ROLE_USER': 'USER',
      'ROLE_SUPPORT': 'SUPPORT'
    };
    return roleMap[roleName] || roleName;
  }
  
  getBadgeClass(roleName: string): string {
    const classMap: { [key: string]: string } = {
      'ROLE_ADMIN': 'bg-danger',
      'ROLE_USER': 'bg-success',
      'ROLE_SUPPORT': 'bg-info'
    };
    return classMap[roleName] || 'badge-default';
  }

}
