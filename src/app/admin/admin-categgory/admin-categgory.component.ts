import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminCategoryService } from 'src/app/services/admin/category/admin-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-categgory',
  templateUrl: './admin-categgory.component.html',
  styleUrls: ['./admin-categgory.component.css', '../assets/css/main.css']
})
export class AdminCateggoryComponent {

  constructor(
    private adminCategoryService: AdminCategoryService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
  ) { }

  list: any;
  token: any;
  p: number = 1;
  itemPerPage: number = 10;

  ngOnInit() {
    this.getToken();
    this.getList();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }


  getList() {
    this.adminCategoryService.getAllCategories(this.token).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.list = data.data;
      }
    });
  }

  confirmDeleteCat(id: any) {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Bạn có chắc chắn là muốn xóa hãng này?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletCat(id);
      }
    });
  }

  deletCat(id: any) {

    this.adminCategoryService.delete(id, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Xóa thành công!");
        this.getList();
      }
    });
  }

}
