import { Component, ViewChild } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { AdminCategoryService } from 'src/app/services/admin/category/admin-category.service';
import { CategoryReq } from 'src/app/dto/CategoryReq';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.css', '../assets/css/main.css']
})
export class AdminCategoryUpdateComponent {
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
    this.adminCateoryService.getDetail(this.id, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.object = data.data;
        this.ckeditorData = this.object.description;

        this.imageUrl = this.object.avatar;
      }
    });
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
      this.imageUrl = this.object.avatar;
    }
  }

  onSubmit(myForm: NgForm) {
    this.formData = new FormData();
    this.formData.append('name', this.object.name);

    const fileInput = document.getElementById('uploadfile') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.formData.append('avatar', file);
    }
    this.formData.append('description', this.ckeditorData);
    this.update();
  }

  update() {
    this.adminCateoryService.update(this.id, this.formData, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Cập nhật thành công!")
      }
    });
  }

  public onChange({ editor }: ChangeEvent) {
    this.ckeditorData = editor.getData();
  }
}
