import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { AdminCategoryService } from 'src/app/services/admin/category/admin-category.service';
import { CategoryReq } from 'src/app/dto/CategoryReq';

@Component({
  selector: 'app-admin-category-create',
  templateUrl: './admin-category-create.component.html',
  styleUrls: ['./admin-category-create.component.css', '../assets/css/main.css']
})
export class AdminCategoryCreateComponent {


  formData: FormData;
  token: any;
  type: any;
  id: any;
  imageUrl: any = '';

  object: CategoryReq = {
    name: '',
    avatar: '',
    description: ''
  };

  public Editor = ClassicEditor;
  ckeditorData: any = '';

  constructor(

    private adminCateoryService: AdminCategoryService,
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
    if (myForm.valid) {
      this.formData = new FormData();
      this.formData.append('name', myForm.value.name);

      const fileInput = document.getElementById('uploadfile') as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        this.formData.append('avatar', file);
        //console.log(file)
      }
      this.formData.append('description', this.ckeditorData);
      //console.log(this.formData);
      this.create();
    }
  }

  create() {
    this.adminCateoryService.create(this.formData, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Thêm thành công!")
      } else {
        this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    });
  }

  public onChange({ editor }: ChangeEvent) {
    this.ckeditorData = editor.getData();
  }

}
