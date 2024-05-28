import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductOptionReq } from 'src/app/dto/ProductOptionReq';
import { NgForm } from '@angular/forms';
import { AdminProductOptionService } from 'src/app/services/admin/product-option/admin-product-option.service';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-admin-product-option-modal',
  templateUrl: './admin-product-option-modal.component.html',
  styleUrls: ['./admin-product-option-modal.component.css',
    '../assets/css/main.css']
})
export class AdminProductOptionModalComponent {

  productId: any;
  id: any;
  formData: FormData;
  token: any;
  type: any;
  imageUrl: any = '';

  instance: DynamicDialogComponent | undefined;

  constructor(
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    private adminProductOptionService: AdminProductOptionService,
    private cookieService: CookieService,
    private toastService: ToastService) {
    this.instance = this.dialogService.getInstance(this.ref);
    this.formData = new FormData()
  }

  ngOnInit() {
    if (this.instance && this.instance.data) {
      this.productId = this.instance.data['productId'];
      this.type = this.instance.data['type'];
      this.id = this.instance.data['id'];

      //console.log(this.productId, this.type, this.id)
    }
    this.getToken();

    if (this.type == 'edit') {
      this.getDetailProductOption();
    }
  }

  productOption: ProductOptionReq = {
    createdDate: "",
    lastModifiedDate: "",
    createdBy: 0,
    lastModifiedBy: 0,
    productId: 0,
    ram: 0,
    storageCapacity: 0,
    color: "",
    image: "",
    price: 0,
    quantity: 0,
    status: true
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
      if (this.type == 'edit') {
        this.imageUrl = this.productOption.image;
      }
    }
  }

  getDetailProductOption() {
    this.adminProductOptionService.detailProductOption(this.token, this.id).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.productOption = data.data;
        this.imageUrl = this.productOption.image;
      }
    });

  }

  onSubmit(myForm: NgForm) {
    this.formData = new FormData();
    this.formData.append('color', myForm.value.color);

    const fileInput = document.getElementById('productOptionImage') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.formData.append('image', file);
      //console.log(file)
    }
    this.formData.append('storageCapacity', myForm.value.storageCapacity);
    this.formData.append('price', myForm.value.price);
    this.formData.append('quantity', myForm.value.quantity);
    this.formData.append('ram', myForm.value.ram);
    this.formData.append('productId', this.productId);
    this.formData.append('status', myForm.value.status);

    this.typeProductOption();
  }

  typeProductOption() {

    if (this.type == 'create') {
      this.createProductOption();

    }
    else {
      this.updateProductOption();
    }
  }


  createProductOption() {
    this.adminProductOptionService.createProductOption(this.token, this.formData).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Thêm thành công!!!")
      }
    });
  }

  updateProductOption() {
    this.adminProductOptionService.updateProductOption(this.token, this.formData, this.id).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.toastService.success("Cập nhật thành công!")
      }
    });
  }

  close() {
    this.ref.close();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
