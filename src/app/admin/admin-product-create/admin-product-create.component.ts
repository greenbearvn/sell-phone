import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { AdminProductService } from 'src/app/services/admin/product/admin-product.service';
import { AdminCategoryService } from 'src/app/services/admin/category/admin-category.service';
import { AdminPromotionService } from 'src/app/services/promotion/admin-promotion.service';
// import { MatDialog } from '@angular/material/dialog';
import { AdminProductOptionModalComponent } from '../admin-product-option-modal/admin-product-option-modal.component';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';



@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.css',
    '../assets/css/main.css'
  ],
})
export class AdminProductCreateComponent {
  product: Product = {
    name: '',
    avatar: '',
    screenTechnology: '',
    screenResolution: '',
    widescreen: '',
    maximumBrightness: '',
    touchGlass: '',
    rearCamera: '',
    flashLight: '',
    rearCameraFeature: '',
    frontCamera: '',
    frontCameraFeature: '',
    operationSystem: '',
    cpu: '',
    cpuSpeed: '',
    graphicChip: '',
    mobileNetwork: '',
    sim: '',
    wifi: '',
    gps: '',
    bluetooth: '',
    chargingPort: '',
    headphoneJack: '',
    otherPort: '',
    batteryCapacity: '',
    batteryType: '',
    maximumChargingSupport: '',
    batteryTechnology: '',
    advancedSecurity: '',
    specialFeature: '',
    waterDustResistance: '',
    record: '',
    movieSupport: '',
    musicSupport: '',
    design: '',
    material: '',
    size: '',
    launchDate: '',
    description: '',
    categoryId: '',
    promotionId: '',
    promotionValue: 0,
    status: ''
  };

  token: any;
  formData: FormData;
  promotions: any;
  categories: any;
  imageUrl: any = '';

  public Editor = ClassicEditor;
  ckeditorData: any = '';

  constructor(
    private adminProductService: AdminProductService,
    private cookieService: CookieService,
    private adminCategoryService: AdminCategoryService,
    private adminPromotionService: AdminPromotionService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private toastService: ToastService
  ) {
    this.formData = new FormData()
  }



  ngOnInit() {
    this.getToken();
    this.getAllCategory();
    this.getAllPromotion();
  }

  onSubmit(myForm: NgForm) {
    this.formData = new FormData();
    this.formData.append('name', myForm.value.name);

    // Assuming 'File' is an actual File object
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.formData.append('avatar', file);
    }

    this.formData.append('screenTechnology', myForm.value.screenTechnology);
    this.formData.append('screenResolution', myForm.value.screenResolution);
    this.formData.append('widescreen', myForm.value.widescreen);
    this.formData.append('maximumBrightness', myForm.value.maximumBrightness);
    this.formData.append('rearCamera', myForm.value.rearCamera);
    this.formData.append('rearCameraFeature', myForm.value.rearCameraFeature);
    this.formData.append('touchGlass', myForm.value.touchGlass);
    this.formData.append('flashLight', myForm.value.flashLight);
    this.formData.append('frontCamera', myForm.value.frontCamera);
    this.formData.append('frontCameraFeature', myForm.value.frontCameraFeature);

    this.formData.append('operationSystem', myForm.value.operationSystem);
    this.formData.append('cpu', myForm.value.cpu);
    this.formData.append('cpuSpeed', myForm.value.cpuSpeed);
    this.formData.append('graphicChip', myForm.value.graphicChip);
    this.formData.append('mobileNetwork', myForm.value.mobileNetwork);
    this.formData.append('sim', myForm.value.sim);
    this.formData.append('wifi', myForm.value.wifi);
    this.formData.append('gps', myForm.value.gps);
    this.formData.append('bluetooth', myForm.value.bluetooth);
    this.formData.append('chargingPort', myForm.value.chargingPort);

    this.formData.append('headphoneJack', myForm.value.headphoneJack);
    this.formData.append('otherPort', myForm.value.otherPort);
    this.formData.append('batteryCapacity', myForm.value.batteryCapacity);
    this.formData.append('batteryType', myForm.value.batteryType);
    this.formData.append('maximumChargingSupport', myForm.value.maximumChargingSupport);
    this.formData.append('batteryTechnology', myForm.value.batteryTechnology);
    this.formData.append('advancedSecurity', myForm.value.advancedSecurity);
    this.formData.append('specialFeature', myForm.value.specialFeature);
    this.formData.append('waterDustResistance', myForm.value.waterDustResistance);
    this.formData.append('record', myForm.value.record);

    this.formData.append('movieSupport', myForm.value.movieSupport);
    this.formData.append('musicSupport', myForm.value.musicSupport);
    this.formData.append('design', myForm.value.design);
    this.formData.append('material', myForm.value.material);
    this.formData.append('size', myForm.value.size);
    this.formData.append('launchDate', myForm.value.launchDate);
    this.formData.append('description', this.ckeditorData);
    this.formData.append('categoryId', myForm.value.categoryId);
    this.formData.append('promotionId', myForm.value.promotionId);
    this.formData.append('promotionValue', myForm.value.promotionValue);
    this.formData.append('status', myForm.value.status);
    //console.log(this.formData);

    this.createProduct();

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

  createProduct() {
    this.adminProductService.createProduct(this.token, this.formData).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Thêm thành công!");
      }
    },
      (error) => {
        this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại.");
        //console.error("Lỗi khi thêm sản phẩm:", error);
      }
    );
  }

  getAllPromotion() {
    this.adminPromotionService.getAllPromotion(this.token).subscribe((data) => {
      if (data.status === 'SUCCESS') {

        this.promotions = data.data;
      }
    });
  }

  getAllCategory() {
    this.adminCategoryService.getAllCategories(this.token).subscribe((data) => {
      if (data.status === 'SUCCESS') {

        this.categories = data.data;
      }
    });
  }

  public onChange({ editor }: ChangeEvent) {
    this.ckeditorData = editor.getData();
    //console.log(this.ckeditorData);
  }

}
