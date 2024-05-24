import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { AdminCategoryService } from 'src/app/services/admin/category/admin-category.service';
import { CategoryReq } from 'src/app/dto/CategoryReq';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.css','../assets/css/main.css']
})
export class AdminCategoryUpdateComponent {

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
    private toastService: ToastService,
    private route: ActivatedRoute,
  ) {
      this.formData = new FormData()
  }

  ngOnInit(){
    this.getToken();
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.detail();
  }

  getToken(){
    this.token = this.cookieService.get('jwt_token');
  } 
  detail() {
    this.adminCateoryService.getDetail(this.id, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.object = data.data;
        this.ckeditorData = data.data.description;
      }
    });
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
    this.checkSubmit();
  }

  checkSubmit(){
    if(this.type == 'create'){
      this.create();
    }
    else{
        this.update();
    }
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

  update(){
    this.adminCateoryService.update(this.id,this.formData,this.token).subscribe((data:any) => {
      if(data.status === 'SUCCESS'){
        this.toastService.success("Cập nhật hãng thành công!!!")
      }
    });
  }

}
