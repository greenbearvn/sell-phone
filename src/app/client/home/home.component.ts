import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/client/home/home.service';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
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
    '../assets/blocks/search/assets/css/search_simple.css',

    '../assets/blocks/products_sale/assets/css/default.css',
    '../assets/blocks/mainmenu/assets/css/moby.min.css',

    '../assets/home/default.css',
    '../assets/home/default.scss',
    '../assets/home/swiper-bundle.min.css',
    '../assets/detail/modules/products/assets/css/product.css',

    '../assets/detail/modules/products/assets/css/product.scss',
  ]
})
export class ClientHomeComponent {
  @ViewChild('carousel', { static: true }) carousel!: CarouselComponent;

  constructor(
    private homeService: HomeService,
    // private cookieService: CookieService,
    // private toastService: ToastService,
    // private route: ActivatedRoute,

  ) { }

  iphones: any[] = [];
  bestSale: any[] = [];
  newProducts: any[] = [];
  minProduct: any[] = [];
  debitProducts: any[] = [];
  images: any | undefined;

  ngOnInit() {
    this.getBestSale();
    this.getNewProducts();
    this.getMinProducts();
    this.getDebitProducts();
    this.getSlide();
  }

  getSlide() {
    this.homeService.getSlide().subscribe((data) => {
      if (data.status === "SUCCESS") {
        this.images = data.data;
        // console.log(this.images);
      }
    });
  }

  onGalleriaValueChange(event: any) {
    // Update the property value
    this.images = event;
  }

  getBestSale() {
    this.homeService.getSaleProduct().subscribe((data) => {

      if (data.status === "SUCCESS") {
        this.bestSale = data.data;
        this.iphones = data.data;
        // console.log(this.bestSale);
        // console.log(this.bestSale[0].productOptionDtos[0].newPrice);
      }

    });
  }

  getNewProducts() {
    this.homeService.getNewProducts().subscribe((data) => {

      if (data.status === "SUCCESS") {
        this.newProducts = data.data;
      }

    });
  }

  getMinProducts() {
    this.homeService.getMinProducts().subscribe((data) => {

      if (data.status === "SUCCESS") {
        this.minProduct = data.data;

      }

    });
  }

  getDebitProducts() {
    this.homeService.getDebitProducts().subscribe((data) => {

      if (data.status === "SUCCESS") {
        this.debitProducts = data.data;

      }

    });
  }

  nextSlide() {
    this.carousel.nextSlide();
  }

  previousSlide() {
    this.carousel.previousSlide();
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
