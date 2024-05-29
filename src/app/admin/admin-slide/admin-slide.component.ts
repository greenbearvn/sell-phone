import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { AdminSlideService } from 'src/app/services/admin/slide/admin-slide.service';

@Component({
  selector: 'app-admin-slide',
  templateUrl: './admin-slide.component.html',
  styleUrls: ['./admin-slide.component.css', '../assets/css/main.css']
})
export class AdminSlideComponent {
  constructor(    
    private cookieService: CookieService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private adminSlideService: AdminSlideService,
  ) { }

  slides: any;
  token: any;
  p: number = 1;
  itemPerPage: number = 10;


  ngOnInit() {
    this.getToken();
    this.getAllSlides();
  }


  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  getAllSlides() {
    this.adminSlideService.getAll(this.token).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.slides = data.data;
      }
    });
  }

  deleteSlide(id: any) {

    this.adminSlideService.delete(id, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Xóa bài viết thành công!");
        this.getAllSlides();
      }
    });
  }

  confirmDelete(id: any) {

    Swal.fire({
      title: 'Cảnh báo',
      text: 'Bạn có chắc chắn là muốn xóa banner này?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSlide(id);
      }
    });
  }
}
