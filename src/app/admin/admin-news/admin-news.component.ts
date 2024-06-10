import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { AdminNewsService } from 'src/app/services/admin/news/admin-news.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css', '../assets/css/main.css'
  ]
})
export class AdminNewsComponent {

  constructor(
    private adminNewsService: AdminNewsService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
  ) { }

  news: any;
  token: any;
  p: number = 1;
  itemPerPage: number = 10;


  ngOnInit() {
    this.getToken();
    this.getNews();
  }


  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  getNews() {
    try {
      this.loadingOverlayServiceService.show();
      this.adminNewsService.getNews(this.token).subscribe((data) => {
        if (data.status === 'SUCCESS') {
          this.news = data.data;
        }
        this.loadingOverlayServiceService.hide();
      }, (error) => {
        this.loadingOverlayServiceService.hide();
        this.toastService.error(error.error.message);
      });
    } catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }

  deleteNews(id: any) {

    this.adminNewsService.delete(id, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Xóa bài viết thành công!");
        this.getNews();
      }
    });
  }

  delete(id: any) {

    Swal.fire({
      title: 'Cảnh báo',
      text: 'Bạn có chắc chắn là muốn xóa tin tức này?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteNews(id);
      }
    });
  }
}
