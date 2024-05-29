import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderStatusService {

  constructor(private http: HttpClient) { }

  getById(id: any, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/order-status/' + id, { headers });
  }

  getAll(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get('/api/v1/order-status/all', { headers });
  }
}
