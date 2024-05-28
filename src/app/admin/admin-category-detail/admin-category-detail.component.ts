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
  selector: 'app-admin-category-detail',
  templateUrl: './admin-category-detail.component.html',
  styleUrls: ['./admin-category-detail.component.css', '../assets/css/main.css']
})
export class AdminCategoryDetailComponent {
  formData: FormData;
  token: any;
  type: any;
  id: any;

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
        this.ckeditorData = data.data.description;
      }
    });
  }

}
