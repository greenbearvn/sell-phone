import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderReq } from 'src/app/dto/OrderReq';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  constructor(private http: HttpClient) { }

  getOrderById(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/order/' + id, { headers });
  }

  getAllByAdmin(token: any, statusId: any, paymentTypeId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    var param = '';
    if (statusId !== null) {
      param += '?statusId=' + statusId;
    } else {
      param += '?statusId=';
    }
    if (paymentTypeId !== null) {
      param += '&paymentTypeId=' + paymentTypeId;
    } else {
      param += '&paymentTypeId=';
    }

    return this.http.get('/api/v1/order/all' + param, { headers });
  }

  getAllByUser(token: any, statusId: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    var param = '';
    if (statusId != null || statusId != '') {
      param += '?statusId=' + statusId;
    } else {
      param += '?statusId=';
    }
    
    return this.http.get('/api/v1/order/my' + param, { headers });
  }

  // create(formData: FormData, token: any) {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.post('/api/v1/order', formData, { headers });
  // }

  // delete(id: any, token: any) {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.delete('/api/v1/order/' + id, { headers });
  // }

  update(id: any, requets: OrderReq, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch('/api/v1/order/' + id, requets, { headers });
  }
}
