import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CartService } from '../services/client/cart/cart.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: [
    './client.component.css',
    './assets/templates/default/css/jquery.lazyloadxt.fadein.min.css',
    './assets/templates/default/css/font-awesome.min.css',
    './assets/templates/default/css/bootstraphome.css',
    './assets/modules/home/assets/css/swiper-bundle.min.css',
    './assets/modules/home/assets/css/default.css',
    './assets/blocks/mainmenu/assets/css/icon.css',
    './assets/blocks/slideshow/assets/css/default.css',
    './assets/blocks/video/assets/css/video.css',
    './assets/libraries/jquery/owlcarousel/assets/owl.carousel.min.css',
    './assets/libraries/jquery/owlcarousel/assets/owl.theme.default.min.css',

    './assets/blocks/products_sale/assets/css/default.css',
    './assets/blocks/mainmenu/assets/css/moby.min.css',
    './assets/blocks/mainmenu/assets/css/menu_mobile.css',
    './assets/blocks/search/assets/css/search_simple.css',
    './assets/blocks/mainmenu/assets/css/bottom_menu_mobile.css',

    './assets/detail/templates/default/css/responsive.css',
    './assets/detail/templates/default/css/theme.css',

    './assets/detail/templates/default/css/bootstrap.min.css',
    './assets/detail/modules/products/assets/css/product.css',

    './assets/detail/modules/products/assets/css/slide.css',
  ],
})
export class ClientComponent {
  token: any;

  countCartItem: any;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getToken();
    this.countItemCart();
  }

  getToken(): string {
    this.token = this.cookieService.get('jwt_token');
    return this.token;
  }

  checkLogin() {
    const token = this.getToken(); // Assuming getToken() returns the token
   

    if (token.length < 10) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/trang-ca-nhan']);
    }
  }

  countItemCart() {
    this.cartService.countItem(this.token).subscribe((data) => {
      if (data.status === 'SUCCESS') {
        this.countCartItem = data.data;
      }
    });
  }
}
