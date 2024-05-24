import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductOptionReq } from 'src/app/dto/ProductOptionReq';

@Injectable({
  providedIn: 'root'
})
export class AdminProductOptionService {

  constructor(private http: HttpClient) { }

  getProductOptionByProductId(token:any,productId:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/product-option/all?productId=' + productId,{ headers });
  }

  createProductOption(token:any,formData:FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('/api/v1/product-option', formData,{ headers });
  }

  detailProductOption(token:any,id:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/product-option/' +id,{ headers });
  }

  updateProductOption(token:any,formData:FormData,id:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch('/api/v1/product-option/'+id, formData,{ headers });
  }

  deleteProductOption(token:any,id:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete('/api/v1/product-option/' + id,{ headers });
  }
}
