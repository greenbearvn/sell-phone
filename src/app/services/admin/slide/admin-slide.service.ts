import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminSlideService {

  constructor(private http: HttpClient) { }

  getById(id: any, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/slide/' + id, { headers });
  }

  getAll(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get('/api/v1/slide/all', { headers });
  }

  create(formData: FormData, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('/api/v1/slide', formData, { headers });
  }

  delete(id: any, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete('/api/v1/slide/' + id, { headers });
  }

  update(id: any, formData: FormData, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch('/api/v1/slide/' + id, formData, { headers });
  }
}
