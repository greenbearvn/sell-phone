import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { NewsReq } from 'src/app/dto/NewsReq';
import { AdminNewsService } from 'src/app/services/admin/news/admin-news.service';
import { AdminNewsTypeService } from 'src/app/services/admin/news/admin-news-type.service';

@Component({
  selector: 'app-admin-news-create',
  templateUrl: './admin-news-create.component.html',
  styleUrls: ['./admin-news-create.component.css'
  ,'../assets/css/main.css'
  ]
})
export class AdminNewsCreateComponent {

  newsType:any;
  formData: FormData;
  token:any;
  type:any;


  news: NewsReq = {
    title: '',
    avatar: '',
    summary: '',
    content: '',
    status: '',
    newsTypeId: ''
  };

  public Editor = ClassicEditor;
  ckeditorData:any = '';
  

  constructor(
    private adminNewsService: AdminNewsService,
    private cookieService: CookieService,
    private toastService: ToastService,
  private adminNewsTypeService: AdminNewsTypeService) {
      this.formData = new FormData()
  }

  ngOnInit() {
  
    this.getToken();
    this.getAdminNewsTypes();

   }

    getToken(){
      this.token = this.cookieService.get('jwt_token');
    }


    onSubmit(myForm: NgForm) {
      this.formData = new FormData();
      this.formData.append('title', myForm.value.title);
    
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        this.formData.append('avatar', file);
        console.log(file)
      }
      this.formData.append('summary', myForm.value.summary);
      this.formData.append('content', this.ckeditorData);
      this.formData.append('status', myForm.value.status);
      this.formData.append('newsTypeId', myForm.value.newsTypeId);

      this.create();
    }

 
    public onChange({ editor }: ChangeEvent) {
      this.ckeditorData = editor.getData();
      console.log(this.ckeditorData);
    }


    create(){
      this.adminNewsService.create(this.formData,this.token).subscribe((data:any) => {

        if(data.status === 'SUCCESS'){
          
          this.toastService.success("Thêm bài viết thành công!!!")
  
        }
      });
    }

    getAdminNewsTypes(){
      this.adminNewsTypeService.getAll(this.token).subscribe((data:any) => {

        if(data.status === 'SUCCESS'){
          
          this.newsType = data.data;
  
        }
      });
    }

}
