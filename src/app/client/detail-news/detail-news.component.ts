import { Component } from '@angular/core';
import { ClientNewsService } from 'src/app/services/client/news/client-news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css',
  '../assets/templates/default/css/jquery.lazyloadxt.fadein.min.css',
  '../assets/templates/default/css/font-awesome.min.css',
  '../assets/templates/default/css/bootstraphome.css',
  '../assets/modules/home/assets/css/swiper-bundle.min.css',
  '../assets/modules/home/assets/css/default.css',
  '../assets/blocks/mainmenu/assets/css/icon.css',
  '../assets/blocks/slideshow/assets/css/default.css',

  '../assets/blocks/products_sale/assets/css/default.css',
  '../assets/blocks/mainmenu/assets/css/moby.min.css',
  '../assets/blocks/mainmenu/assets/css/menu_mobile.css',
  '../assets/blocks/search/assets/css/search_simple.css',
  '../assets/blocks/mainmenu/assets/css/bottom_menu_mobile.css',
  '../assets/news/breadcrumbs_simple.css',
  '../assets/news/home.css',
  '../assets/news/inline.css',
  '../assets/news/news_products.css',
  '../assets/news/newslist_default.css',
  '../assets/news/sale.css',]
})
export class DetailNewsComponent {

  constructor(
    private clientNewsService: ClientNewsService,
    // private cookieService: CookieService,
    private route: ActivatedRoute,
  ) { }


  news:any;
  id:any;

  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.getDetail();
  }

  getDetail(){
    this.clientNewsService.getDetail(this.id).subscribe((data) => {

      if(data.status === 'SUCCESS'){
        this.news = data.data;
        console.table(this.news)
      }
    
    });
  }

}
