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
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css',
    '../assets/css/main.css'
  ]
})
export class AdminProductUpdateComponent {
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
  imageUrl: any = '';

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
      header: type == 'create' ? 'Thêm option điện thoại' : 'Cập nhật option điện thoại',
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageUrl = this.product.avatar;
    }
  }

  onSubmit(myForm: NgForm) {
    this.formData = new FormData();
    this.formData.append('name', myForm.value.name);

    // Assuming 'File' is an actual File object
    const fileInput = document.getElementById('uploadfile') as HTMLInputElement;
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
    console.log(this.formData);

    this.updateProduct();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');

  }

  detailProduct() {
    this.adminProductService.detail(this.token, this.id).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.product = data.data;        
        this.imageUrl = this.product.avatar;
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
