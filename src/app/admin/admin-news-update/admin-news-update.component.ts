import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { NewsReq } from 'src/app/dto/NewsReq';
import { AdminNewsService } from 'src/app/services/admin/news/admin-news.service';
import { AdminNewsTypeService } from 'src/app/services/admin/news/admin-news-type.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-news-update',
  templateUrl: './admin-news-update.component.html',
  styleUrls: ['./admin-news-update.component.css','../assets/css/main.css']
})
export class AdminNewsUpdateComponent {

  newsId:any;
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
  private adminNewsTypeService: AdminNewsTypeService,
  private route: ActivatedRoute,) {
      this.formData = new FormData()
  }
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.newsId = Number(routeParams.get('id'));
    
    this.getToken();
    this.getAdminNewsTypes();
    this.detail();
  }

  getToken(){
    this.token = this.cookieService.get('jwt_token');
  }


  detail() {
    this.adminNewsService.getDetail(this.newsId, this.token).subscribe((data: any) => {
      if (data.status === 'SUCCESS') {
        this.news = data.data;
        this.ckeditorData = data.data.content;
      }
    });
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

    console.log(this.formData);
    this.update();
  }

  public onChange({ editor }: ChangeEvent) {
    this.ckeditorData = editor.getData();
    console.log(this.ckeditorData);
  }


  update(){
    this.adminNewsService.update(this.newsId,this.formData,this.token).subscribe((data:any) => {

      if(data.status === 'SUCCESS'){
        
        this.toastService.success("Cập nhật bài viết thành công!!!")

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
