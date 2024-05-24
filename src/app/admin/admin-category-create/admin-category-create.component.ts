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
  styleUrls: ['./admin-category-create.component.css','../assets/css/main.css']
})
export class AdminCategoryCreateComponent {


  formData: FormData;
  token:any;
  type:any;
  id:any;

  object: CategoryReq = {
    name: '',
    avatar: '',
    description: ''
  };

  public Editor = ClassicEditor;
  ckeditorData:any = '';

  constructor(
   
    private adminCateoryService:AdminCategoryService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {
      this.formData = new FormData()
  }

  ngOnInit(){
    this.getToken();
  }

  getToken(){
    this.token = this.cookieService.get('jwt_token');
  } 

  onSubmit(myForm: NgForm) {
    this.formData = new FormData();
    this.formData.append('name', myForm.value.title);
  
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.formData.append('avatar', file);
      console.log(file)
    }
    this.formData.append('description', this.ckeditorData);


    console.log(this.formData);
    this.create();
  }

  public onChange({ editor }: ChangeEvent) {
    this.ckeditorData = editor.getData();
    console.log(this.ckeditorData);
  }

  create(){
    this.adminCateoryService.create(this.formData,this.token).subscribe((data:any) => {
      if(data.status === 'SUCCESS'){
        this.toastService.success("Thêm hãng thành công!!!")
      }
    });
  }

}
