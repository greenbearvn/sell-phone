import { Component } from '@angular/core';
import { ClientDetailService } from 'src/app/services/client/detail/client-detail.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'angular-toastify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css',
  '../assets/css/style.css',
  '../assets/css/home_products.css',
  '../assets/css/trangchu.css'
]
})
export class ClientDetailComponent {

  constructor(
    private clientDetailService: ClientDetailService,
    private cookieService: CookieService,
    private toastService: ToastService,
    private route: ActivatedRoute

  ) { }

  id:any;

  product:any;
  token:any;
  options:any;

  // style
  clickOnOption:any;


  ngOnInit(){

    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.getDetailProduct();
  }

  getDetailProduct(){
    this.clientDetailService.getDetailProduct(this.id,this.token).subscribe((data) => {

      if(data.status === "SUCCESS"){
        this.product = data.data;
        this.options = data.data.productOptionDtos;
        this.toastService.success(data.message);
      }
      else{
        this.toastService.error(data.message);
      }
    });
  }

}
