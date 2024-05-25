import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AdminProductService } from 'src/app/services/admin/product/admin-product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AdminCategoryService } from 'src/app/services/admin/category/admin-category.service';
import { AdminPromotionService } from 'src/app/services/promotion/admin-promotion.service';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminProductOptionModalComponent } from '../admin-product-option-modal/admin-product-option-modal.component';
import { AdminProductOptionService } from 'src/app/services/admin/product-option/admin-product-option.service';


import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css',
    '../assets/css/main.css'
  ]
})
export class AdminProductDetailComponent {

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
  id: any;
  promotions: any;
  categories: any;
  productOptions: any;

  // paginate
  p: number = 1;
  itemPerPage: number = 10;

  formData: FormData;

  public Editor = ClassicEditor;
  ckeditorData: any = '';

  constructor(
    private adminProductService: AdminProductService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private adminCategoryService: AdminCategoryService,
    private adminPromotionService: AdminPromotionService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private adminProductOptionService: AdminProductOptionService
  ) {
    this.formData = new FormData()
  }

  ngOnInit() {
    this.getToken();
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.detailProduct();
    this.getAllCategory();
    this.getAllPromotion();
    this.getProductOptions();
  }

  // modal
  showModalBox(productId: any, id: any, type: any) {
    const dialogRef = this.dialogService.open(AdminProductOptionModalComponent, {
      header: type == 'create' ? 'Thêm lựa chọn điện thoại' : 'Cập nhật lựa chọn điện thoại',
      modal: true,
      dismissableMask: true,
      width: '70%',
      data: {
        productId: productId,
        id: id,
        type: type
      }
    });

    dialogRef.onClose.subscribe(() => {
      this.getProductOptions();
    });
  }

  closeDialog(data: any) {
    this.ref.close(data);
    this.getProductOptions();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');

  }

  detailProduct() {
    this.adminProductService.detail(this.token, this.id).subscribe((data) => {
      if (data.status === 'SUCCESS') {

        this.product = data.data;
        console.log(this.product);
      }
    });
  }

  updateProduct() {
    this.adminProductService.updateProduct(this.token, this.id, this.formData).subscribe((data) => {
      console.log(data)
      if (data) {
        this.toastService.success("Cập nhật thành công");
      }
    });
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

  // product option get all
  getProductOptions() {
    this.adminProductOptionService.getProductOptionByProductId(this.token, this.id).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.productOptions = data.data;
      }
    });
  }

  confirmDeleteOption(id: any) {
    Swal.fire({
      title: 'Cảnh báo',
      text: 'Bạn có chắc chắn là muốn xóa option này?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProductOption(id);
      }
    });
  }

  deleteProductOption(id: any) {
    this.adminProductOptionService.deleteProductOption(this.token, id).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Xóa thành công");
        this.getProductOptions();
      }
    });
  }

  public onChange({ editor }: ChangeEvent) {
    this.ckeditorData = editor.getData();
    console.log(this.ckeditorData);
  }
}
