import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/client/home/home.service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { LoadingOverlayServiceService } from 'src/app/services/loading-overlay-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css',
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
    '../assets/blocks/products_sale/assets/css/default.css',
    '../assets/blocks/mainmenu/assets/css/moby.min.css',
    '../assets/blocks/search/assets/css/search_simple.css',
    '../assets/category/cat_1.css',
    '../assets/category/cat_1.scss',
    '../assets/category/products_filter_default.css',
    '../assets/category/products_filter_default.scss',
    '../assets/detail/blocks/breadcrumbs/assets/css/breadcrumbs_simple.css',
    '../assets/detail/plugins/comments/css/rating.css',
  ]
})
export class CategoryComponent {

  constructor(
    private router: Router,
    private homeService: HomeService,
    private toastService: ToastService,
    private loadingOverlayServiceService: LoadingOverlayServiceService,
  ) { }

  products: any;
  urlParams: any;

  selectedPrice: any = '';
  selectedRam: any = '';
  selectedRom: any = '';
  selectedSort: any = '';

  ngOnInit() {
    // window.location.href = '/dien-thoai?categoryId=1';
    var currentURL = window.location.href;
    var param = new URLSearchParams(new URL(currentURL).search);

    this.searchProduct(param);
  }

  navigateToCategory(categoryId: number) {
    this.router.navigate(['/dien-thoai'], { queryParams: { categoryId: categoryId } });
    
    var currentURL = window.location.href;
    var param = new URLSearchParams(new URL(currentURL).search);
    this.searchProduct(param);
  }


  onChange() {
    this.urlParams = "search=" + this.selectedPrice + this.selectedRam + this.selectedRom + this.selectedSort;
    console.log(this.urlParams);
    this.searchProduct(this.urlParams);
  }

  searchProduct(param: any) {
    this.loadingOverlayServiceService.show();
    this.homeService.searchProduct(param).subscribe((data) => {
      this.products = data.data;
      this.loadingOverlayServiceService.hide();
    },
      (error) => {
        this.loadingOverlayServiceService.hide();
        this.toastService.error(error.error.message);
      }
    );
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
