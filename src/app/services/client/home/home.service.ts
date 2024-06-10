import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  searchProduct(param : any): Observable<any> {

    return this.http.get('/api/v1/product/search?' + param) ;
  }

  getSaleProduct(): Observable<any> {

    return this.http.get('/api/v1/product/all?promotionId='+ 1);
  }

  getNewProducts(): Observable<any> {

    return this.http.get('/api/v1/product/all?promotionId='+ 2);
  }

  getMinProducts(): Observable<any> {

    return this.http.get('/api/v1/product/all?promotionId='+ 3);
  }

  getDebitProducts(): Observable<any> {

    return this.http.get('/api/v1/product/all?promotionId='+ 4);
  }

  getSlide(): Observable<any> {
    return this.http.get('/api/v1/slide');
  }
}
