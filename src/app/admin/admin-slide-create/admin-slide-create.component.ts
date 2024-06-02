import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import { AdminSlideService } from 'src/app/services/admin/slide/admin-slide.service';
import { Slide } from 'src/app/models/Slide';

@Component({
  selector: 'app-admin-slide-create',
  templateUrl: './admin-slide-create.component.html',
  styleUrls: ['./admin-slide-create.component.css', '../assets/css/main.css']
})
export class AdminSlideCreateComponent {
  formData: FormData;
  token: any;
  type: any;
  id: any;
  imageUrl: any = '';

  object: Slide = {
    id: null,
    avatar: '',
    position: null,
    description: '',
    status: '',
  };

  constructor(

    private adminSlideService: AdminSlideService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {
    this.formData = new FormData()
  }

  ngOnInit() {
    this.getToken();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
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
      this.imageUrl = null;
    }
  }

  onSubmit(myForm: NgForm) {
    this.formData = new FormData();
    const fileInput = document.getElementById('uploadfile') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.formData.append('avatar', file);
      //console.log(file)
    }

    this.formData.append('position', this.object.position);
    this.formData.append('description', this.object.description);
    this.formData.append('status', this.object.status);
    this.create();
  }

  create() {
    try {
      this.adminSlideService.create(this.formData, this.token).subscribe(
        (data: any) => {
          if (data && data.status === 'SUCCESS') {
            this.toastService.success("Thêm thành công!");          
          }
        },
        (error) => {
          this.toastService.error(error.error.message);
        }
      );
    } catch (error) {
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }

}
