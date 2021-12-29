import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isChef = false;
  isUser = false;
  isFirstLogin: boolean = false;
  username = '';
  user: User = new User("", "", "", "", "", []);
  
  constructor(
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.username = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
    }
    this.loadUser();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      if (rol === 'ROLE_CHEF') {
        this.isChef = true;
      }
      if (rol === 'ROLE_USER') {
        this.isUser = true;
      }
    });

  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
    //window.location.reload();
    this.isLogged = false;
  }

  loadUser(): void {
    console.log("menu-username",this.username);
    this.authService.detailUsername(this.username).subscribe(
      data => {
        console.log("menu-data-",data);
        this.user = data;
        if (!this.user.lastConnection) {
          this.isFirstLogin = true;
        }
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

}
