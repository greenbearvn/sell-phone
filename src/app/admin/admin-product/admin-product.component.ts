import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminProductService } from 'src/app/services/admin/product/admin-product.service';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css',
  '../assets/polygon/concept/assets/vendor/bootstrap/css/bootstrap.min.css',
  '../assets/polygon/concept/assets/vendor/fonts/circular-std/style.css',
  '../assets/polygon/concept/assets/libs/css/style.css',
  '../assets/polygon/concept/assets/vendor/fonts/fontawesome/css/fontawesome-all.css',
  '../assets/polygon/concept/assets/vendor/charts/chartist-bundle/chartist.css',
  '../assets/polygon/concept/assets/vendor/charts/morris-bundle/morris.css',
  '../assets/polygon/concept/assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css',
  '../assets/polygon/concept/assets/vendor/charts/c3charts/c3.css',
  '../assets/polygon/concept/assets/vendor/fonts/flag-icon-css/flag-icon.min.css',
  '../assets/polygon/concept/assets/vendor/datatables/css/dataTables.bootstrap4.css',
  '../assets/polygon/concept/assets/vendor/datatables/css/buttons.bootstrap4.css',
  '../assets/polygon/concept/assets/vendor/datatables/css/select.bootstrap4.css',
  '../assets/polygon/concept/assets/vendor/datatables/css/fixedHeader.bootstrap4.css',]
})
export class AdminProductComponent {

  constructor(
    private adminProductService: AdminProductService,
    private cookieService: CookieService,
  ) { }

  products:any;

  
  token:any;
  p: number = 1;
  itemPerPage:number=10;

  faPenToSquare:any = faPenToSquare;


  ngOnInit(){
    this.getToken();
    this.getProducts();
  }

  getToken(){
    this.token = this.cookieService.get('jwt_token');
  }

  getProducts(){
    this.adminProductService.getProducts(this.token).subscribe((data) => {

      if(data.status === 'SUCCESS'){
        this.products = data.data;
        console.log(this.products);
      }
    
    });
  }

}
