import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUser } from "../models/login-user";
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { Role } from '../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser;
  newUser: User;
  username: string;
  password: string;
  email: string;
  roles: string[] = [];
  errMsj: string;
  isRegister: boolean;
  isLogin: boolean;
  role: Role;
  

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isLogged = false;
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
    this.isLogin = true;
    this.isRegister = false;
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        /*
        this.toastr.success('Welcome ' + data.username, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        */
        this.router.navigate(['/index']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    );
  }

  onRegister(): void {
    this.role = new Role('ROLE_USER');
    this.newUser = new User(this.username, this.email, this.password, '', '', [this.role]);
    this.authService.create(this.newUser).subscribe(
      data => {
        this.toastr.success('User has been successfully created', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.goToLogin();
        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    );
  }

  goToRegister(): void {
    this.isRegister = true;
    this.isLogin = false;
  }

  goToLogin(): void {
    this.isLogin = true;
    this.isRegister = false;
  }

}
