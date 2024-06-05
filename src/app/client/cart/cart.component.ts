import { Component } from '@angular/core';
import { CartService } from 'src/app/services/client/cart/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import Swal from 'sweetalert2';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';
import { ClientComponent } from '../client.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    './cart.component.css',
    '../assets/templates/default/css/jquery.lazyloadxt.fadein.min.css',
    '../assets/templates/default/css/font-awesome.min.css',
    '../assets/templates/default/css/bootstraphome.css',
    '../assets/modules/home/assets/css/swiper-bundle.min.css',
    '../assets/modules/home/assets/css/default.css',
    '../assets/blocks/mainmenu/assets/css/icon.css',
    '../assets/blocks/slideshow/assets/css/default.css',
    '../assets/blocks/video/assets/css/video.css',
    '../assets/libraries/jquery/owlcarousel/assets/owl.carousel.min.css',
    '../assets/libraries/jquery/owlcarousel/assets/owl.theme.default.min.css',
    '../assets/blocks/mainmenu/assets/css/moby.min.css',

    '../assets/blocks/search/assets/css/search_simple.css',

    '../assets/cart/cart.css',
    '../assets/cart/cart.scss',
    '../assets/cart/select2.min.css',
  ],
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private clientComponent: ClientComponent,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
  ) { }

  cartItems: any;
  token: any;
  cartMem: any;

  ngOnInit() {
    this.getToken();
    this.getCart();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  getCart() {
    try {
      this.loadingOverlayServiceService.show();
      this.cartService.getAll(this.token).subscribe((data) => {
        if (data.status === 'SUCCESS') {
          this.cartItems = data.data;
        }
        this.loadingOverlayServiceService.hide();
      },
        (error) => {
          this.loadingOverlayServiceService.hide();
          this.toastService.error(error.error.message);
        }
      );
    } catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }

  deleteBtn(id: any) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa khỏi giỏ hàng?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(id);
        this.clientComponent.countItemCart();
      }
    });
  }

  deleteItem(id: any) {
    try {
      this.loadingOverlayServiceService.show();
      this.cartService.delete(id, this.token).subscribe((data) => {
        if (data.status === 'SUCCESS') {
          this.getCart();
          this.toastService.success('Xóa thành công');
        }
        this.loadingOverlayServiceService.hide();
      },
        (error) => {
          this.loadingOverlayServiceService.hide();
          this.toastService.error(error.error.message);
        });
    } catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }

  addItemMem(cartItem: any) {
    let existingCartItems: any[] = [];
    let cartData = localStorage.getItem('cart');
    if (cartData !== null) {
      existingCartItems = JSON.parse(cartData);
    }

    let itemExists = false;

    for (let item of existingCartItems) {
      if (item.id === cartItem.id) {
        itemExists = true;
        break;
      }
    }

    if (!itemExists) {
      existingCartItems.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(existingCartItems));
      this.toastService.error("Sản phẩm đã được thêm vào thanh toán !");
    } else {
      this.toastService.error("Sản phẩm đã được thêm vào thanh toán !");
    }
  }

  updateQuantity(id: any, quantity: any) {
    try {
      this.loadingOverlayServiceService.show();
      this.cartService.updateCart(id, quantity, this.token).subscribe((data) => {
        if (data.status === 'SUCCESS') {
          this.getCart();
          this.toastService.success('Cập nhật thành công');
        }
        this.loadingOverlayServiceService.hide();
      },
        (error) => {
          this.loadingOverlayServiceService.hide();
          console.log("Lỗi: " + error.error.message);          
          this.toastService.error(error.error.message);
        });
    } catch (error) {
      this.loadingOverlayServiceService.hide();
      this.toastService.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  }

  formatCurrencyVND(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

}
