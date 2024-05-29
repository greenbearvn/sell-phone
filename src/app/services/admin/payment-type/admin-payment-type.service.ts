import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPaymentTypeService {

  constructor(private http: HttpClient) { }

  getById(id: any, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/payment-type/' + id, { headers });
  }

  getAll(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get('/api/v1/payment-type/all', { headers });
  }
}
