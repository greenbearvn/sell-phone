import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) { }

  getProducts(token:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/product/all',{ headers });
  }
  createProduct(token:any, formData:FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('/api/v1/product', formData,{ headers });
  }

  detail(token:any, id:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/product/' + id ,{ headers });
  }

  deleteProduct(token: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`/api/v1/product/${id}`, {headers});
  }

  updateProduct(token:any,id:any,formData:FormData){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // const options = { headers: headers };
    return this.http.patch(`/api/v1/product/${id}`,formData, {headers});
  }
}
