import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { ToastService } from 'angular-toastify';
import { AdminNewsService } from 'src/app/services/admin/news/admin-news.service';
import { AdminProductService } from'src/app/services/admin/product/admin-product.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css',
    '../assets/css/main.css'
  ]
})
export class AdminProductComponent {

  constructor(
    private adminProductService: AdminProductService,
    private cookieService: CookieService,
    private toastService: ToastService,
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

  deleteProduct(id:any){
    this.adminProductService.deleteProduct(this.token,id).subscribe((data) => {
    

      if(data.status === 'SUCCESS'){
        this.toastService.success("Đã xóa thành công");
        this.getProducts();
      }else{
        this.toastService.error(data.message);
        this.getProducts();
      }
    });
  }

}
