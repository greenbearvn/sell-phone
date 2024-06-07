import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }


  getAddressCurrentUser(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/address/all', { headers });
  }

  createOrder(token: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('/api/v1/order', data, { headers });
  }

  getOrderById(token: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/order/' + id, { headers });
  }

  getOrderDetail(token: any, orderId: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/order-detail/all?orderId=' + orderId, { headers });
  }

  createPaymentMomo(token: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('/api/v1/payment/momo/create-payment-link', data, { headers });
  }

  checkPaymentMomo(token: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('/api/v1/payment/momo/check-status-transaction', data, { headers });
  }

}
