import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReq } from 'src/app/dto/UserReq';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  constructor(private http: HttpClient) { }

  getCurrent(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/user/my', { headers });
  }

  getAll(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/user/all', { headers });
  }


  getDetail(id: any, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/user/' + id, { headers });
  }

  // create(userReq: UserReq, token: any) {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.post('/api/v1/user', userReq, { headers });
  // }

  delete(id: any, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete('/api/v1/user/' + id, { headers });
  }

  // update(id: any, userReq: UserReq, token: any) {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.patch('/api/v1/user/' + id, userReq, { headers });
  // }

  updateByAdmin(id: any, userReq: UserReq, token: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch('/api/v1/user/update/' + id, userReq, { headers });
  }
}
