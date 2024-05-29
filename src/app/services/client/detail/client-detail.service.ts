import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailService {

  constructor(private http: HttpClient) { }

  getDetailProduct(id:any,token:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/product/' + id,{ headers });
  }


  getInforProductOptions(productId:any,option:any): Observable<any> {

    let url = '/api/v1/product-option/search?productId=' + productId;

    if(option.ram.data != null){
      url += '&ram=' + option.ram.data;
    }

    if (option.rom && option.rom.data) {
      url += '&rom=' + option.rom.data;
    }
    
    if (option.color && option.color.data) {
      url += '&color=' + encodeURIComponent(option.color.data);
    }

    return this.http.get(url);

   

  }

  getRecommendProduct(categoryId:any): Observable<any> {
  
    return this.http.get('/api/v1/product/all?categoryId=' + categoryId);
  }



}
