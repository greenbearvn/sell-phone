import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(token:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/category/all',{ headers });
  }

  
  getDetail(id:any,token:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/category/'+id,{ headers });
  }

  create(formData:FormData,token:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('/api/v1/category',formData,{ headers });
  }

  delete(id:any,token:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete('/api/v1/category/'+id,{ headers });
  }

  update(id:any,formData:FormData,token:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch('/api/v1/category/'+id,formData,{ headers });
  }
}
