import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUser(token: any, formData: FormData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch(`/api/v1/user`, formData, { headers });
  }
}
