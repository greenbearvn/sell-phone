import { Component } from '@angular/core';
import { CartService } from 'src/app/services/client/cart/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import Swal from 'sweetalert2';

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
    '../assets/blocks/mainmenu/assets/css/menu_mobile.css',
    '../assets/blocks/search/assets/css/search_simple.css',
    '../assets/blocks/mainmenu/assets/css/bottom_menu_mobile.css',
    '../assets/cart/cart.css',
    '../assets/cart/cart.scss',
    '../assets/cart/select2.min.css',
  ],
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {}

  cartItems: any;
  token: any;
  totalMoney: any;

  cartMem: any;

  ngOnInit() {
    this.getToken();
    this.getCart();
    this.calTotalMoney();
  }

  getToken() {
    this.token = this.cookieService.get('jwt_token');
  }

  getCart() {
    this.cartService.getAll(this.token).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.cartItems = data.data;
        console.log(data.data);
        console.log(this.cartItems);
        this.calTotalMoney();
      } else {
      }
    });
  }

  deleteBtn(id: any) {
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: 'Một khi bạn xóa, bạn sẽ không thể khôi phục lại thông tin này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa đi!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(id);
      }
    });
  }

  deleteItem(id: any) {
    this.cartService.delete(id, this.token).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.getCart();
        this.toastService.success('Xóa thành công');
      } else {
        this.toastService.success('Xóa không thành công');
      }
    });
  }

  calTotalMoney() {
    this.totalMoney = 0; // Initialize totalMoney to zero before summing up
    for (let i of this.cartItems) {
      // Use 'of' instead of 'in' to iterate over values
      this.totalMoney += i.productOptionDto.newPrice * i.quantity;
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
        this.toastService.error("Sản phẩm đã được thêm vào thanh toán !!!");
    } else {
        this.toastService.error("Sản phẩm đã được thêm vào thanh toán !!!");
    }
}

}
