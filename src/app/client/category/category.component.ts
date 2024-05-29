import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/client/home/home.service';

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
  '../assets/blocks/mainmenu/assets/css/menu_mobile.css',
  '../assets/blocks/search/assets/css/search_simple.css',
  '../assets/blocks/mainmenu/assets/css/bottom_menu_mobile.css',
  '../assets/category/cat_1.css',
  '../assets/category/cat_1.scss',
  '../assets/category/products_filter_default.css',
  '../assets/category/products_filter_default.scss'
]
})
export class CategoryComponent {

  constructor( private homeService: HomeService){

  }
  products:any;

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.homeService.getNewProducts().subscribe((data) => {
      this.products = data.data;
      console.log(this.products);

    });
  }

}
