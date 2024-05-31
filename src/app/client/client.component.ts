import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CartService } from '../services/client/cart/cart.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: [
    './client.component.css',
  ],
})
export class ClientComponent {
  token: any;

  countCartItem = null;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getToken();
    if (this.token != null && this.token.length != 0) {
      this.countItemCart();
    }
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
