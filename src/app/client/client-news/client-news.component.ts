import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ClientNewsService } from 'src/app/services/client/news/client-news.service';

@Component({
  selector: 'app-client-news',
  templateUrl: './client-news.component.html',
  styleUrls: ['./client-news.component.css',
  '../assets/css/style.css',

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
