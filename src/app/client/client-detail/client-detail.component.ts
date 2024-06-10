import { Component } from '@angular/core';
import { ClientDetailService } from 'src/app/services/client/detail/client-detail.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailInforProductComponent } from '../detail-infor-product/detail-infor-product.component';
import { CartService } from 'src/app/services/client/cart/cart.service';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';
import Swal from 'sweetalert2';
import { ClientComponent } from '../client.component';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css',
    '../assets/templates/default/css/jquery.lazyloadxt.fadein.min.css',
    '../assets/templates/default/css/font-awesome.min.css',
    '../assets/detail/templates/default/css/bootstrap.min.css',
    '../assets/modules/home/assets/css/default.css',
    '../assets/detail/modules/products/assets/css/lightgallery.min.css',
    '../assets/home/default.css',
    '../assets/home/default.scss',
    '../assets/detail/modules/products/assets/css/product.css',
    '../assets/detail/modules/products/assets/css/product.scss',
    '../assets/detail/templates/default/css/responsive.css',
    '../assets/detail/templates/default/css/theme.css',
    '../assets/detail/templates/default/css/bootstrap.min.css',
    '../assets/detail/modules/products/assets/css/slide.css',
    '../assets/detail/blocks/mainmenu/assets/css/moby.min.css',
    '../assets/blocks/search/assets/css/search_simple.css',
    '../assets/detail/blocks/mainmenu/assets/css/icon.css',
    '../assets/detail/blocks/breadcrumbs/assets/css/breadcrumbs_simple.css',
    '../assets/detail/plugins/comments/css/rating.css',

  ]
})
export class ClientDetailComponent {

  constructor(
    private clientDetailService: ClientDetailService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private cartService: CartService,
    private clientComponent: ClientComponent,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
  ) { }

  id: any;
  product: any;
  token: any;
  options: any;

  clickOnOption: any;
  isActive: boolean = false;
  oldPrice: any;
  newPrice: any;
  optionChoose: any;
  idOptionChoosed: any = 0;
  quantity: any = 0;
  recommendProducts: any;

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  ngOnInit() {
    this.getToken();
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.getDetailProduct();
  }

  openModalDetailInfor() {
    const dialogRef = this.dialogService.open(DetailInforProductComponent, {
      header: 'Thông tin chi tiết điện thoại',
      modal: true,
      dismissableMask: true,
      width: '70%',
      data: {
        product: this.product
      }
    });

    dialogRef.onClose.subscribe(() => {

    });
  }

  getDetailProduct() {
    try {
      this.loadingOverlayServiceService.show();
      this.clientDetailService.getDetailProduct(this.id, this.token).subscribe((data) => {
        if (data.status === "SUCCESS") {
          this.product = data.data;
          this.options = data.data.productOptionDtos;
          this.getRecommendProduct();
          if (this.options.length > 0) {
            this.oldPrice = this.options[0].price;
            this.newPrice = this.options[0].newPrice;
          }
          else {
            this.oldPrice = 0;
            this.newPrice = 0;
          }
          this.setInitialDataOption();
          console.log(this.options[0].ram)
        }
        this.loadingOverlayServiceService.hide();
      }, (error) => {
        this.loadingOverlayServiceService.hide();
        this.toastService.error(error.error.message);
      }
      );
    } catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }

  option: any = {
    ram: {
      index: 0,
      data: null,
    },
    rom: {
      index: 0,
      data: null,
    },
    color: {
      index: 0,
      data: null,
    }
  }

  setInitialDataOption() {
    this.idOptionChoosed = this.options[0].id;

    this.option.ram.data = this.options[0].ram;
    this.option.rom.data = this.options[0].storageCapacity;
    this.option.color.data = this.options[0].color;
  }

  getInforProductOptions() {
    try {
      this.loadingOverlayServiceService.show();
      this.clientDetailService.getInforProductOptions(this.id, this.option).subscribe((data) => {
        if (data.status === "SUCCESS") {
          this.optionChoose = data.data
          if (this.optionChoose.length > 0) {
            this.idOptionChoosed = this.optionChoose[0].id;
            this.oldPrice = this.optionChoose[0].price;
            this.newPrice = this.optionChoose[0].newPrice;
          }
          else {
            this.toastService.error("Sản phẩm này không còn hoặc không tồn tại!");
            this.oldPrice = 0;
            this.newPrice = 0;
          }
        }
        this.loadingOverlayServiceService.hide();
      }, (error) => {
        this.loadingOverlayServiceService.hide();
        this.toastService.error(error.error.message);
      });
    } catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }

  addRam(index: any, ram: any) {
    this.option.ram.index = index;
    this.option.ram.data = ram;
    console.table(this.option)
    this.getInforProductOptions();
  }

  addRom(index: any, rom: any) {
    this.option.rom.index = index;
    this.option.rom.data = rom;
    console.table(this.option)
    this.getInforProductOptions();
  }

  addColor(index: any, color: any) {
    this.option.color.index = index;
    this.option.color.data = color;
    console.table(this.option)
    this.getInforProductOptions();

  }

  getRecommendProduct() {
    this.clientDetailService.getRecommendProduct(this.product.categoryId).subscribe((data) => {
      if (data.status === "SUCCESS") {
        this.recommendProducts = data.data;
      }
    });
  }

  addCart() {
    if (this.token == null || this.token == '') {
      Swal.fire({
        title: 'Bạn cần đang nhập để thêm vào giỏ hàng?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng nhập',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/dang-nhap';
        }
      });
    } else {
      try {
        this.loadingOverlayServiceService.show();
        this.cartService.addCart(this.idOptionChoosed, 1, this.token).subscribe((data) => {
          if (data.status === "SUCCESS") {
            this.toastService.success("Thêm vào giỏ hàng thành công!");
            this.clientComponent.countItemCart();
          }
          this.loadingOverlayServiceService.hide();
        }, (error) => {
          this.loadingOverlayServiceService.hide();
          this.toastService.error(error.error.message);
        }
        );
      } catch (error) {
        this.loadingOverlayServiceService.hide();
        this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
      }
    }
  }

  uniqueOptions(type: any) {
    if (type == 'ram') {
      return this.options.filter((option: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t.ram === option.ram
        ))
      );
    }

    if (type == 'color') {
      return this.options.filter((option: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t.color === option.color
        ))
      );
    }

    if (type == 'storageCapacity') {
      return this.options.filter((option: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t.storageCapacity === option.storageCapacity
        ))
      );
    }

  }

  formatCurrencyVND(amount: number): string {
    if (!amount) {
      amount = 0;
    }
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

}
