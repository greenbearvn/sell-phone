import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ClientNewsService } from 'src/app/services/client/news/client-news.service';

@Component({
  selector: 'app-client-news',
  templateUrl: './client-news.component.html',
  styleUrls: ['./client-news.component.css',
  '../assets/templates/default/css/jquery.lazyloadxt.fadein.min.css',
  '../assets/templates/default/css/font-awesome.min.css',
  '../assets/templates/default/css/bootstraphome.css',
  '../assets/modules/home/assets/css/swiper-bundle.min.css',
  '../assets/modules/home/assets/css/default.css',
  '../assets/blocks/mainmenu/assets/css/icon.css',
  '../assets/blocks/slideshow/assets/css/default.css',

  '../assets/blocks/products_sale/assets/css/default.css',
  '../assets/blocks/mainmenu/assets/css/moby.min.css',

  '../assets/blocks/search/assets/css/search_simple.css',

  '../assets/news/breadcrumbs_simple.css',
  '../assets/news/home.css',
  '../assets/news/inline.css',
  '../assets/news/news_products.css',
  '../assets/news/newslist_default.css',
  '../assets/news/sale.css',
  ]
})
export class ClientNewsComponent {

  constructor(
    private clientNewsService: ClientNewsService,
    private cookieService: CookieService,

  ) { }

  news:any;

  token:any;
  p: number = 1;
  itemPerPage:number=10;


  ngOnInit(){
    this.getToken();
    this.getNews();
  }

  getToken(){
    this.token = this.cookieService.get('jwt_token');
   
  }

  getNews(){
    this.clientNewsService.getNews(this.token).subscribe((data) => {

      if(data.status === 'SUCCESS'){
        this.news = data.data;
        console.log(this.news);
      }
    
    });
  }

}
