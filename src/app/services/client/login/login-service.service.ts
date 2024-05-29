import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/app/dto/LoginDTO';
import { UserRegister } from 'src/app/dto/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(LoginDTO:any): Observable<any> {
    return this.http.post('/api/v1/auth/login',LoginDTO);
  }

  getUsers(token:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('/api/v1/user/all',{ headers });
  }

  register(userReq:any): Observable<any> {
   
    return this.http.post('/api/v1/user',userReq);
  }

  currentUser(token:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
   
    return this.http.get('/api/v1/user/my',{ headers });
  }

 

}
