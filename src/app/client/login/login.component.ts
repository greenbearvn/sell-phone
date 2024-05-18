import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/client/login/login-service.service';
import { LoginDTO } from 'src/app/dto/LoginDTO';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(
    private loginService: LoginServiceService,
    private cookieService: CookieService,
  ) { }

  loginData : LoginDTO ={
    account : '',
    password:''
  }

  data:any;

  token:any;

  ngOnInit(){
    // console.log(this.token);
    // this.getAllUser();
  }

  login(){
    console.log(this.loginData);
    this.loginService.login(this.loginData).subscribe((data) => {
      this.data = data;
     
      this.token = this.data.data.accessToken;
      console.log(this.token);
      this.cookieService.set('jwt_token', this.token);
    
    });
  }

  getToken(){
    this.token = this.cookieService.get('jwt_token');
    console.log(this.token);
  }

  // getAllUser(){
  //   this.loginService.getUsers(this.token).subscribe((data) => {
  //     this.data = data;
  //     console.log(this.data);
  //   });
  // }

}
